import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrderService } from '../services/order.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Order } from '../models/order.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers:[OrderService]
})
export class OrdersComponent implements OnInit {
  Submitbutton='Save';
  update=false;
  SelectedOrder = { };
  editId :string='';
  items : Order[];
  closeResult: string;
  successMessage : any;
  message: any;

  constructor(private orderService: OrderService, private modalService: NgbModal, private toastr: ToastrService) { }

  ngOnInit() {

   // this.SelectedOrder = Order;

    //Fetch data 
    this.orderService.getOrder().subscribe((res:Order[])=>{
      console.log(`Orders ${res}`);
      this.items = res;
    })
  }

  //toaster

  showSuccess(message) {
    this.toastr.success(message);

  }
  showError(message){
    this.toastr.error(message);
  }

  //submitOrder
  submitOrder(form: NgForm){
     console.log(`Order form ${JSON.stringify(form.value)}`);
       
     if(form.value && this.update == false){
        
      this.orderService.postOrder(form.value).subscribe((res:Order)=>{
        console.log(`Response ${res}`);
        this.items.push(res)  
        this.SelectedOrder = {};
        //this.alertMessage('secondary','Successfully Submitted !!');
        this.showSuccess('Successfully Submitted !!')
      },(err)=>{
        console.log(`Error Fetching ${err}`);
      })
    }
  } 

  onEdit(item: Order, content){
    this.open(content);
    this.update=true;
    if(item._id){
      this.SelectedOrder = item;
      this.editId = item._id; 
      console.log(this.editId)
    }else 
      this.SelectedOrder = item ;
    console.log('SelectedOrder'+ JSON.stringify(this.SelectedOrder));    
  }

  onUpdate(form: NgForm){
    debugger;
    this.orderService.putOrder(form.value,this.editId).subscribe((res)=>{
//      console.log(`Update Response ${res}`); 
      this.SelectedOrder = {};
      this.showSuccess('Updated Successfully !!')
      form.reset();
    },(err)=> console.log(`${err}`)) 
  }

  onDelete(id: string){
    console.log(`Item ${id}`);
    if(confirm("Are you sure, Do you want delete?") == true){
      this.orderService.deleteOrder(id).subscribe((res)=>{
        this.showSuccess('Deleted successfully !!');
        this.items=this.items.filter(item => item._id!==id);
      },err=>{console.log("Error while deletion"+err)})
    }     
  }

  /* Open Modal Logic */

  open(content){
    this.modalService.open(content,{ ariaLabelledBy:'modal-basic-title',   size: 'lg' }).result.then((result)=>{
      this.closeResult = `Closed with : ${result}`;
      
    },(reason)=>{
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    })
  }
  /* Closed Modal*/ 
  getDismissReason(reason: any): string {
    this.SelectedOrder={};
    if(reason === ModalDismissReasons.ESC) return 'by pressed Escape';
    else if(reason === ModalDismissReasons.BACKDROP_CLICK) return 'backdrop click';
    else return `with ${reason}`;

  }

  /* Alert Messages*/

  alertMessage(type,message){
    this.successMessage = {
      type: type,
      message: message,
    };
    setTimeout(()=> this.successMessage=null,1000);
  }

  closeAlert(){
    this.successMessage = null;
  }

}
