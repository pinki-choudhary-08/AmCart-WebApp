import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as uuid from 'uuid';
import { AuthService } from 'src/app/core/auth-service/auth.service';
import { Address } from 'src/app/shared/model/Address';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {
  @Output() selectedTabChanged = new EventEmitter<number>();
  public currentAddresses: Address[] = [];
  public defaultAddress: Address | undefined;
  public newAddress: Address = new Address("", "", "", "", "", "", "","", false, "", "", 0);
  constructor(
    private addressService: AddressService,
    private authService: AuthService
  ) {
    addressService.addressUpdated$.subscribe(() => {
      this.currentAddresses = addressService.getAddresses(
        authService.getUserEmail()
      );
      this.defaultAddress = this.currentAddresses.find((address) => address.isDefault == true);
      let index = this.currentAddresses.findIndex(
        (address) => address.isDefault == true
      );
      if (index > -1) {
        this.currentAddresses.splice(index, 1);
      }
    });
  }

  ngOnInit(): void {}

  selectAddress(addressId: string) {
    this.selectedTabChanged.emit(1);
  }

  updateAddress(addressId: string) {
    if (addressId) {
      this.addressService.updateAddress(
        this.newAddress,
        this.authService.getUserEmail()
      );
    } else {
      this.newAddress.id = uuid.v4();
      this.addressService.addAddress(
        this.newAddress,
        this.authService.getUserEmail()
      );
    }
    this.newAddress = new Address("", "", "", "", "", "", "","", false, "", "", 0);
  }

  editAddress(addressId: string) {
    let editableAdddress = this.currentAddresses.find(
      (address) => address.id == addressId
    );
    if(editableAdddress) {
      this.newAddress = editableAdddress;
    }
  }

  deleteAddress(addressId: string) {
    this.addressService.deleteAddress(
      addressId,
      this.authService.getUserEmail()
    );
  }

  cancel() {
    this.newAddress = new Address("", "", "", "", "", "", "","", false, "", "", 0);
  }
}
