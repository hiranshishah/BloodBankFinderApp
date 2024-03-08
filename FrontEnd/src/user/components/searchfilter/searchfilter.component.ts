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
import { DeletebloodbankComponent } from 'src/bloodbank/components/deletebloodbank/deletebloodbank.component';
import { AddbloodbankComponent } from 'src/bloodbank/components/addbloodbank/addbloodbank.component';
import { UpdatebloodbankComponent } from 'src/bloodbank/components/updatebloodbank/updatebloodbank.component';
import { AuthGuard } from 'src/shared/guards/auth.guard'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-searchfilter',
  templateUrl: './searchfilter.component.html',
  styleUrls: ['./searchfilter.component.scss']
})
export class SearchfilterComponent implements OnInit, OnDestroy {
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
  userRole: string;
  currentUser: any;

  constructor(
    private bloodbankservice: BloodbankService,
    private formBuilder: FormBuilder,
    private searchService: SearchserviceService,
    private locationservice: LocationserviceService,
    private dialog: MatDialog,
    private auth: AuthGuard,
    private snackBar: MatSnackBar
  ) {
    this.searchForm = this.formBuilder.group({
      searchQuery: ''
    });

    this.filterForm = this.formBuilder.group({
      // selectedDistance: '',
      selectedBloodGroup: ''
    });
  }

  async ngOnInit(): Promise<void> {
    this.getBloodBanks();
    const position = await this.locationservice.getLocation();
    const userLatitude = position.coords.latitude;
    const userLongitude = position.coords.longitude;
    (bloodBanks: bloodbank[]) => {
      this.bloodBanks = bloodBanks;
      this.filteredBloodBanks = [...bloodBanks];
      this.applyPagination();
    }

    this.userRole = sessionStorage.getItem('role');
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

    if (searchQuery && searchQuery.trim() !== '') {
      this.searchService.getsearchedrecords(searchQuery).subscribe(filteredBloodBanks => {
        this.filteredBloodBanks = filteredBloodBanks;
        this.applyPagination();
      });
    } else {
      this.filteredBloodBanks = [...this.bloodBanks];
      this.applyPagination(); // Update paginator length
    }
  }

  filterBloodBanks(): void {
    const selectedBloodGroup = this.filterForm.value.selectedBloodGroup.toLowerCase();
    console.log(selectedBloodGroup);
    console.log(this.filterForm.value);
    if (selectedBloodGroup) {
      console.log(selectedBloodGroup);

      this.filteredBloodBanks = this.bloodBanks.filter(bloodBank => {
        bloodBank.bloodtypes['selectedBloodGroup'] > 0;
      });
    } else {
      this.filteredBloodBanks = [...this.bloodBanks];
    }
    console.log(this.filteredBloodBanks);
    console.log(selectedBloodGroup);
    this.applyPagination(); // Update paginator length
  }

  resetFilters(): void {
    this.filterForm.reset();
    this.filteredBloodBanks = [...this.bloodBanks];
  }

  openDetailsDialog(bloodBank: bloodbank): void {
    this.currentUser = localStorage.getItem('currentUser');
    if (this.currentUser) {
      this.dialog.open(MaplocationComponent, {
        data: bloodBank
      });
    }
    else {
      this.snackBar.open('Please log in to view the details', 'OK', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });

    }
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
  opendeletedialog(bloodBank: bloodbank): void {
    this.dialog.open(DeletebloodbankComponent, {
      data: bloodBank
    });
  }
  openAddDialog(): void {
    this.dialog.open(AddbloodbankComponent, {
      height: '85vh',
      width: '80vw',

    });
  }
  openUpdateDialog(bloodBank: bloodbank): void {
    this.dialog.open(UpdatebloodbankComponent, {
      data: bloodBank,
      height: '85vh',
      width: '80vw',
      disableClose: true
    });
  }

}
