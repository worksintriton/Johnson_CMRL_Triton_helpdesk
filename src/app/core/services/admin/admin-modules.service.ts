import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CommonConstants } from 'src/app/common/common.constant';
import { HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminModulesService {

  constructor(private http:HttpClient) { }

  // User MANAGEMENT API LIST STARTS HERE //

  getUserList(){
    return this.http.get(CommonConstants.WEBAPI_URL+'userdetails/getlist')
  }

  getUserInfo(id:any){
    return this.http.get(CommonConstants.WEBAPI_URL+'userdetails/getby_id/'+id);
  }

  createUser(data:any){
    return this.http.post(CommonConstants.WEBAPI_URL+'userdetails/create',data);
  }

  updateUser(data:any){
    return this.http.put(CommonConstants.WEBAPI_URL+'userdetails/update/'+data.id,data)
  }

  deleteUser(id:any){
    return this.http.delete(CommonConstants.WEBAPI_URL+'userdetails/delete/'+id);
  }

  searchUserList(data:any){
    return this.http.post(CommonConstants.WEBAPI_URL+'userdetails/search',data)
  }


  // User MANAGEMENT API LIST ENDEDS HERE //



    // STATION MANAGEMENT API LIST STARTS HERE //

    getstationList(){
      return this.http.get(CommonConstants.WEBAPI_URL+'station_name/getlist')
    }

    getstationInfo(id:any){
      return this.http.get(CommonConstants.WEBAPI_URL+'station_name/getby_id/'+id);
    }

    createstation(data:any){
      console.log(data);
      return this.http.post(CommonConstants.WEBAPI_URL+'station_name/create',data);
    }

    updatestation(data:any){
      console.log(data);
      return this.http.put(CommonConstants.WEBAPI_URL+'station_name/update/'+data.id,data)
    }

    deletestation(id:any){
      console.log(id);
      return this.http.delete(CommonConstants.WEBAPI_URL+'station_name/delete/'+id);
    }

    searchstationList(data:any){
      return this.http.post(CommonConstants.WEBAPI_URL+'station_name/search',data)
    }


    // STATION MANAGEMENT API LIST ENDEDS HERE //



    // JOB NO MANAGEMENT API LIST STARTS HERE //

    getjobnoList(){
      return this.http.get(CommonConstants.WEBAPI_URL+'job_no/getlist')
    }


    getjobno_lift(){
      return this.http.get(CommonConstants.WEBAPI_URL+'job_no/get_jobno/lift');
    }

    getjobnoInfo(id:any){
      return this.http.get(CommonConstants.WEBAPI_URL+'job_no/getby_id/'+id);
    }

    createjobno(data:any){
      console.log(data);
      return this.http.post(CommonConstants.WEBAPI_URL+'job_no/create',data);
    }

    updatejobno(data:any){
      console.log(data);
      return this.http.put(CommonConstants.WEBAPI_URL+'job_no/update/'+data.id,data)
    }

    deletejobno(id:any){
      console.log(id);
      return this.http.delete(CommonConstants.WEBAPI_URL+'job_no/delete/'+id);
    }

    searchjobnoList(data:any){
      return this.http.post(CommonConstants.WEBAPI_URL+'job_no/search',data)
    }


    // JOB NO MANAGEMENT API LIST ENDEDS HERE //



    // FAULT MANAGEMENT API LIST STARTS HERE //

    getfaultList(){
      return this.http.get(CommonConstants.WEBAPI_URL+'fault_type/getlist')
    }

    getfaultInfo(id:any){
      return this.http.get(CommonConstants.WEBAPI_URL+'fault_type/getby_id/'+id);
    }

    getlist_by_type(data:any){
      console.log(data);
      return this.http.post(CommonConstants.WEBAPI_URL+'fault_type/getlist_by_type',data);
    }

    createfault(data:any){
      console.log(data);
      return this.http.post(CommonConstants.WEBAPI_URL+'fault_type/create',data);
    }

    updatefault(data:any){
      console.log(data);
      return this.http.put(CommonConstants.WEBAPI_URL+'fault_type/update/'+data.id,data)
    }

    deletefault(id:any){
      console.log(id);
      return this.http.delete(CommonConstants.WEBAPI_URL+'fault_type/delete/'+id);
    }

    searchfaultList(data:any){
      return this.http.post(CommonConstants.WEBAPI_URL+'fault_type/search',data)
    }


    // FAULT MANAGEMENT API LIST ENDEDS HERE //



    ///getAllDasboardDetails
    getAllDasboardDetails(){
      return this.http.get(CommonConstants.WEBAPI_URL+'dashboard_details/getList')
    }


    getstationBasedTicketList(){
      // const params = new HttpParams().append("id",id);
      return this.http.get(CommonConstants.WEBAPI_URL+'tickethistory/getstationBasedTicketList',)
    }

    getSelectedTicketList(id:any){
      const params = new HttpParams().append("id",id);
      return this.http.get(CommonConstants.WEBAPI_URL+'tickethistory/getSelectedTicketList',{params})
    }

    getFilterDatas(data:any){
      return this.http.post(CommonConstants.WEBAPI_URL+'tickethistory/getFilterDatas',data)
    }

    getFilterDatas_alldata(data:any){
      return this.http.post(CommonConstants.WEBAPI_URL+'tickethistory/getFilterDatas_alldatas',data)
    }


    // Ticket Details

    ticketcreate(data:any){
      return this.http.post(CommonConstants.WEBAPI_URL+'ticket/create',data)
    }

    ticketupdate(data:any){
      return this.http.post(CommonConstants.WEBAPI_URL+'tickethistory/update',data)
    }

    ticketdelete(data:any){
      return this.http.post(CommonConstants.WEBAPI_URL+'ticket/update',data)
    }

    ticketdetailupdate(data:any){
      return this.http.post(CommonConstants.WEBAPI_URL+'ticket/edit',data)
    }


    


    updatetickettime(data:any){
      return this.http.post(CommonConstants.WEBAPI_URL+'tickethistory/edit',data)
    }



}
