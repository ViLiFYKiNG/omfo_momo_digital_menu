/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CATEGORYTYPES } from '../../../shared/constants';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { AddItemToppingsPopupComponent } from './add-item-toppings-popup/add-item-toppings-popup.component';
import { OmfoItem, Topping } from '../../../shared/modals';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DataStorageService } from '../../services/data-storage.service';

@Component({
  selector: 'app-add-item-popup',
  standalone: true,
  imports: [
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
  ],
  templateUrl: './add-item-popup.component.html',
  styleUrl: './add-item-popup.component.scss',
})
export class AddItemPopupComponent implements OnInit {
  sizeForm!: FormGroup;

  selectedIndex: number = -1;

  readonly inputItem = inject<OmfoItem | null>(MAT_DIALOG_DATA);

  ngOnInit(): void {
    this.sizeForm = this.fb.group({
      name: [''],
      description: [''],
      restaurantId: [''],
      imageURL: [''],
      category: ['PIZZA'],
      isAvailable: [false],
      sizes: this.fb.array([this.createSizeField()]),
    });

    if (this.inputItem) {
      this.fillForm(this.inputItem);
    }
  }

  fillForm(data: OmfoItem) {
    this.sizeForm.patchValue({
      name: data.name,
      description: data.description,
      restaurantId: data.restaurantId,
      imageURL: data.imageURL,
      category: data.category,
      isAvailable: data.isAvailable,
    });

    const sizeArray = this.sizeForm.get('sizes') as FormArray;
    sizeArray.clear();

    data.sizes.forEach((sizeData: any) => {
      const sizeGroup = this.createSizeField();
      sizeGroup.patchValue({
        size: sizeData.size,
        price: sizeData.price,
      });

      const toppingsArray = sizeGroup.get('toppings') as FormArray;
      sizeData.toppings &&
        sizeData.toppings.forEach((toppingData: any) => {
          const toppingGroup = this.fb.group({
            name: [toppingData.name, Validators.required],
            price: [toppingData.price, Validators.required],
          });
          toppingsArray.push(toppingGroup);
        });

      sizeArray.push(sizeGroup);
    });
  }

  readonly dialogRef = inject(MatDialogRef<AddItemPopupComponent>);

  readonly CATEGORYTYPES: { cNAME: string; cVALUE: string }[] = CATEGORYTYPES;

  constructor(
    private fb: FormBuilder,
    private dataStorageService: DataStorageService,
  ) {}

  getToppings(index: number): FormArray {
    return this.sizes.at(index).get('toppings') as FormArray;
  }

  isSizeValid(index: number): boolean {
    return this.sizes.at(index).valid;
  }

  addToppings(index: number, toppings: Topping[]) {
    const toppingsArray = this.getToppings(index);
    toppingsArray.clear();

    toppings.forEach((topping: Topping) => {
      toppingsArray.push(
        this.fb.group({
          name: [topping.name],
          price: [topping.price],
        }),
      );
    });

    this.selectedIndex = -1;
  }

  get sizes(): FormArray {
    return this.sizeForm.get('sizes') as FormArray;
  }

  addSizeField() {
    this.sizes.push(this.createSizeField());
  }

  createSizeField(): FormGroup {
    return this.fb.group({
      size: ['', Validators.required],
      price: ['', Validators.required],
      toppings: this.fb.array([]),
    });
  }

  removeSizeField(index: number) {
    if (this.sizes.length > 1) {
      this.sizes.removeAt(index);
    }
  }

  readonly dialog = inject(MatDialog);

  public addToppingPopUp(index: number): void {
    this.selectedIndex = index;
    const dialogRef = this.dialog.open(AddItemToppingsPopupComponent, {
      data: this.getToppings(index),
    });
    dialogRef.afterClosed().subscribe((toppings: Topping[]) => {
      if (toppings) {
        if (this.selectedIndex !== -1) {
          this.addToppings(this.selectedIndex, toppings);
        }
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  async onSubmit(): Promise<void> {
    if (this.inputItem) {
      await this.dataStorageService
        .updateItem(
          this.inputItem.itemId?.toString() ?? '',
          this.sizeForm.value,
        )
        .subscribe(() => {
          this.dialogRef.close('ADD');
        });
    } else {
      await this.dataStorageService
        .storeItem(this.sizeForm.value)
        .subscribe(() => {
          this.dialogRef.close('EDIT');
        });
    }
  }
}
