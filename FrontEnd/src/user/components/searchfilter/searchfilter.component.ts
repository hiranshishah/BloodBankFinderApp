import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { bloodbank } from 'src/shared/models/bloodbank';
import { BloodbankService } from 'src/shared/services/bloodbank.service';
import { SearchserviceService } from 'src/shared/services/searchservice.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { LocationserviceService } from 'src/shared/services/locationservice.service';
import { MaplocationComponent } from '../maplocation/maplocation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-searchfilter',
  templateUrl: './searchfilter.component.html',
  styleUrls: ['./searchfilter.component.scss']
})
export class SearchfilterComponent implements OnInit, OnDestroy{
  bloodBanks: bloodbank[];
  searchQuery: string;
  searchForm: FormGroup;
  filterForm: FormGroup;
  filteredBloodBanks: bloodbank[];
  bloodBankSubscription: Subscription;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
pageSize = 5;
pageIndex = 0;
pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor(
    private bloodbankservice: BloodbankService,
    private formBuilder: FormBuilder,
    private searchService: SearchserviceService,
    private locationservice: LocationserviceService,
    private dialog: MatDialog
  ) {
    this.searchForm = this.formBuilder.group({
      searchQuery: ''
    });

    this.filterForm = this.formBuilder.group({
      selectedDistance: '',
      selectedBloodGroup: ''
    });
  }

  async ngOnInit(): Promise<void> {
    this.getBloodBanks();
    // this.paginator.page.subscribe(() => this.loadPage());
    const position = await this.locationservice.getLocation();
    const userLatitude = position.coords.latitude;
    const userLongitude = position.coords.longitude;
    (bloodBanks: bloodbank[]) => {
      this.bloodBanks = bloodBanks;
      this.filteredBloodBanks = [...bloodBanks];
      this.applyPagination();
    }
    

    
    // this.filteredBloodBanks = this.filteredBloodBanks.map(bloodBank => {
    //   const distance = this.locationservice.haversineDistance(userLatitude, userLongitude, bloodBank.latitude, bloodBank.longitude);
    //   return { ...bloodBank, distance }; 
    // });

    // this.filteredBloodBanks.sort((a, b) => a.distance - b.distance);
  }

  ngOnDestroy(): void {
    if (this.bloodBankSubscription) {
      this.bloodBankSubscription.unsubscribe();
    }
  }

  getBloodBanks(): void {
    this.bloodBankSubscription = this.bloodbankservice.getBloodBanks().subscribe(
      (bloodBanks: bloodbank[]) => {
        this.bloodBanks = bloodBanks;
        console.error(bloodBanks);
        this.filteredBloodBanks = [...bloodBanks];
        this.applyPagination();// Update paginator length
      },
      (error) => {
        console.log(error);
        this.applyPagination();
      }
    );
  }

  searchBloodBanks(): void {
    const searchQuery = this.searchForm.value.searchQuery.toLowerCase();
    const selectedBloodGroup = this.filterForm.value.selectedBloodGroup?.toLowerCase();

    if (searchQuery && searchQuery.trim() !== '') {
      this.searchService.getsearchedrecords(searchQuery).subscribe(filteredBloodBanks => {
        this.filteredBloodBanks = filteredBloodBanks;
        if (selectedBloodGroup) {
          this.filteredBloodBanks = this.filteredBloodBanks.filter(bloodBank => {
            return bloodBank.bloodtypes[selectedBloodGroup] > 0;
          });
        } // Update paginator length
      });
    } else {
      this.filteredBloodBanks = [...this.bloodBanks];
      this.applyPagination(); // Update paginator length
    }
  }

  filterBloodBanks(): void {
    const selectedBloodGroup = this.filterForm.value.selectedBloodGroup?.toLowerCase();
    console.log(this.filterForm.value);
    if (selectedBloodGroup) {
      this.filteredBloodBanks = this.bloodBanks.filter(bloodBank => {
        return bloodBank.bloodtypes[selectedBloodGroup] > 0;
      });
    } else {
      this.filteredBloodBanks = [...this.bloodBanks];
    }
    console.log(this.filteredBloodBanks);
    console.log(selectedBloodGroup);
    this.applyPagination(); // Update paginator length
  }

  // loadPage(): void {
  //   const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
  //   const endIndex = startIndex + this.paginator.pageSize;
  //   this.filteredBloodBanks = this.filteredBloodBanks.slice(startIndex, endIndex);
  // }

  resetFilters(): void {
    this.filterForm.reset();
    this.filteredBloodBanks = [...this.bloodBanks];
  }
  openDetailsDialog(bloodBank: bloodbank): void {
    this.dialog.open(MaplocationComponent, {
      data: bloodBank
    });
  }
  applyPagination(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredBloodBanks = this.bloodBanks.slice(startIndex, endIndex);
  }
  
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.applyPagination();
  }
}
