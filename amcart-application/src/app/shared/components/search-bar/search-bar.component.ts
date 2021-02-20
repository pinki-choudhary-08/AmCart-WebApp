
import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { IProduct } from '../../interfaces/IProduct';

@Component({
    selector: 'app-search-bar',
    templateUrl: './search-bar.component.html',
    styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

    myControl = new FormControl();
    filteredOptions: Observable<string[]> | undefined;
    allProducts: IProduct[] = [];
    autoCompleteList: any[] | undefined;
    value = 'search';
    search = '';
    @ViewChild('autocompleteInput')
  autocompleteInput!: ElementRef;

    constructor(
        private searchService: SearchService
    ) { }

    ngOnInit(): void {

        // get all the post
        this.searchService.getPosts().subscribe(products => {
            this.allProducts = products;
        });

        // when user types something in input, the value changes will come through this
        this.myControl.valueChanges.subscribe(userInput => {
            this.autoCompleteExpenseList(userInput);
        });
    }

    private autoCompleteExpenseList(input: any): void {
        const categoryList = this.filterCategoryList(input);
        this.autoCompleteList = categoryList;
    }

    // this is where filtering the data happens according to you typed value
    filterCategoryList(val: string | null): IProduct[] {
        const categoryList = [];
        if (typeof val !== 'string') {
            return [];
        }
        if (val === '' || val === null) {
            return [];
        }
        return val ? this.allProducts.filter(s => s.name.toLowerCase().indexOf(val.toLowerCase()) !== -1)
            : this.allProducts;
    }

    // after you clicked an autosuggest option, this function will show the field you want to show in input
    displayFn(product: IProduct): string {
        const k = product ? product.name : product;
        return k;
    }

    filterPostList(event: { source: { value: string; }; }): void {
        // var products = event.source.value;
        // if (!products) {
        //     this.searchService.searchOption = []
        // }
        // else {
        //     this.searchService.searchOption.push(products);
        //     this.onSelectedOption.emit(this.searchService.searchOption)
        // }
        // this.focusOnPlaceInput();
    }

    removeOption(option: string): void {

        // let index = this.searchService.searchOption.indexOf(option);
        // if (index >= 0)
        //     this.searchService.searchOption.splice(index, 1);
        // this.focusOnPlaceInput();

        // this.onSelectedOption.emit(this.searchService.searchOption)
    }

    // focus the input field and remove any unwanted text.
    focusOnPlaceInput(): void {
        this.autocompleteInput.nativeElement.focus();
        this.autocompleteInput.nativeElement.value = '';
    }


}
