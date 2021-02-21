import { Component, EventEmitter, Output } from '@angular/core';
import * as uuid from 'uuid';
import { AuthService } from 'src/app/core/auth-service/auth.service';
import { Address } from 'src/app/shared/model/Address';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent {
  @Output() selectedTabChanged = new EventEmitter<number>();
  public currentAddresses: Address[] = [];
  public defaultAddress: Address | undefined;
  public newAddress: Address = new Address(
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    false,
    '',
    '',
    0
  );
  constructor(
    private addressService: AddressService,
    private authService: AuthService
  ) {
    addressService.addressUpdated$.subscribe(() => {
      this.currentAddresses = addressService.getAddresses(
        authService.getUserEmail()
      );
      this.defaultAddress = this.currentAddresses.find(
        (address) => address.isDefault === true
      );
      const index = this.currentAddresses.findIndex(
        (address) => address.isDefault === true
      );
      if (index > -1) {
        this.currentAddresses.splice(index, 1);
      }
    });
  }

  selectAddress(addressId: string): void {
    this.selectedTabChanged.emit(1);
  }

  updateAddress(addressId: string): void {
    if (addressId) {
      this.addressService.updateAddress(
        this.newAddress,
        this.authService.getUserEmail()
      );
    } else {
      if (
        this.newAddress.addressLine1 &&
        this.newAddress.addressLine2 &&
        this.newAddress.city &&
        this.newAddress.state &&
        this.newAddress.contactNumber &&
        this.newAddress.pincode &&
        this.newAddress.customerName
      ) {
        this.newAddress.id = uuid.v4();
        this.addressService.addAddress(
          this.newAddress,
          this.authService.getUserEmail()
        );
      }
    }
    this.newAddress = new Address(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      false,
      '',
      '',
      0
    );
  }

  editAddress(addressId: string): void {
    const editableAdddress = this.currentAddresses.find(
      (address) => address.id === addressId
    );
    if (editableAdddress) {
      this.newAddress = editableAdddress;
    }
  }

  deleteAddress(addressId: string): void {
    this.addressService.deleteAddress(
      addressId,
      this.authService.getUserEmail()
    );
  }

  cancel(): void {
    this.newAddress = new Address(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      false,
      '',
      '',
      0
    );
  }
}
