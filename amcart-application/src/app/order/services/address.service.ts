import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Address } from 'src/app/shared/model/Address';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  public addressUpdated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  constructor() {}

  addAddress(address: Address, customerId: string) {
    let currentAddresses = JSON.parse(
      localStorage.getItem(this.addressKey(customerId)) || '[]'
    );
    currentAddresses.push(address);
    localStorage.setItem(
      this.addressKey(customerId),
      JSON.stringify(currentAddresses)
    );
    this.addressUpdated$.next(true);
  }

  deleteAddress(addressId: string, customerId: string) {
    let currentAddresses = JSON.parse(
      localStorage.getItem(this.addressKey(customerId)) || '[]'
    );
    if (currentAddresses) {
      const addressIndex = currentAddresses.findIndex(
        (address: { id: string }) => address.id === addressId
      );
      if(addressIndex > -1) {
        currentAddresses.splice(addressIndex, 1);
        localStorage.setItem(
          this.addressKey(customerId),
          JSON.stringify(currentAddresses)
        );
      }
    }
    this.addressUpdated$.next(true);
  }

  updateAddress(address: Address, customerId: string) {
    let currentAddresses = JSON.parse(
      localStorage.getItem(this.addressKey(customerId)) || '[]'
    );
    if (currentAddresses) {
      const addressIndex = currentAddresses.findIndex(
        (address: { id: string }) => address.id === address.id
      );
      if(addressIndex > -1) {
        currentAddresses.splice(addressIndex, 1);
        currentAddresses.push(address);
        localStorage.setItem(
          this.addressKey(customerId),
          JSON.stringify(currentAddresses)
        );
      }
    }
    this.addressUpdated$.next(true);
  }

  getAddresses(customerId: string) {
    return JSON.parse(
      localStorage.getItem(this.addressKey(customerId)) || '[]'
    );
  }

  getAddressesById(id: string, customerId: string) {
    var addresses = this.getAddresses(customerId);
    return addresses.find((address: { id: string; }) => address.id == id);
  }

  addressKey(customerId: string): string {
    return `${customerId}Addresses`;
  }
}
