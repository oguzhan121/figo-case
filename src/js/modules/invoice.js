/**
 * Form 
 *
 * @file Invoice.js
 */

import { $,Swal } from '../vendors';
import '../vendors/datatable/jquery.dataTables.min';
import '../vendors/datatable/dataTables.buttons.min';
import '../vendors/datatable/buttons.html5.min';
import { loggedInUser,loggedInUserId } from '../utils/contants';
import { moneyFormat } from '../utils/helper';
import jsonData from '../utils/data.json';

// import  {configureFakeBackend} from '../utils/fakeBackend';

const invoice = (function () {
    const init = function () {

        
        if($('#c-table__listing').length > 0){
            if(loggedInUser == undefined){
                window.location.href = '/';
             }
            listInvoice();
            tableListChecked();
            clearTotalAmount();
            datatableOnLoad();
            discountRequest();
        }
      
    };

    //  async function fetchPromotions() {
    //     const requestOptions = {
    //       method: 'GET',
    //     };
    //     return  await configureFakeBackend(`${window.location.origin}/data`, requestOptions)
    //       .then(listInvoice)
    //   }
      
    const clearTotalAmount = () =>{
        localStorage.setItem('totalAmount',0);
    }

    const listInvoice = () => {
        let tbodyBLock = document.getElementById('c-table__listing');
        let jsonItems = jsonData.Invoices;
        jsonItems.forEach((elements, items) => {
            if (loggedInUserId == elements.UserId) {
                tbodyBLock.innerHTML +=
                    `<tr>
                        <td><input type="checkbox" class="tableSelection" name="id" value="${elements.Id}"></td>
                        <td>${elements.Id}</td>
                        <td>${elements.SenderName}</td>
                        <td>${elements.ReceiverName}</td>
                        <td>${elements.ProfileId}</td>
                        <td>${elements.InsertedDate}</td>
                        <td>${elements.InvoiceTypeCode}</td>
                        <td>${moneyFormat(elements.PayableAmount)}</td>
                        <td>${elements.PayableAmountCurrency}</td>
                    </tr>
           `;
            }
        });
        
    };

    const datatableOnLoad = () => {
        $('#js-table-invoice').DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.12/i18n/Turkish.json"
            },
        });
    }

    const tableListChecked = () => {
        $('.tableSelection').on('click',() => {
            let checkListId = [];
            $("input:checkbox[name=id]:checked").each(function(){
                checkListId.push(decodeURI($(this).val()));
                if(checkListId.length == 3){
                    $("input:checkbox").attr("disabled", true);
                    $("input:checkbox[name=id]:checked").removeAttr("disabled", false);
                }else{
                    $("input:checkbox").removeAttr("disabled", false);
                }
            });
            checkListId = $.unique(checkListId);
            totalAmountCalculation(checkListId);
            localStorage.setItem('selectedInvoiceID',checkListId);
        });
    }

    const totalAmountCalculation = (checkListId) => {
        const totalAmountElement = document.querySelector('.c-table__total')
        let jsonItems = jsonData.Invoices;
        let selectedItemsAmount = [];
        jsonItems.forEach((elements,items) => {
            let arr = checkListId.map(Number);
            if(arr.includes(elements.Id)){
                selectedItemsAmount.push(elements.PayableAmount);
            }
        });

        let totalAmount = 0;
        selectedItemsAmount.forEach((elements)=> {
            totalAmount += elements;
        });
        totalAmountElement.innerHTML = `<span class="c-table__total__text">Toplam Tutar:</span><span id="js-total-amount"> ${moneyFormat(totalAmount)}</span>`;
        localStorage.setItem("totalAmount", totalAmount);
    }

    const discountRequest = () => {
        const discountBtn  = document.getElementById('js-discount');
        discountBtn.addEventListener('click',()=>{
            setTimeout(()=>{
                const totalAmountData  = localStorage.getItem("totalAmount");
                const formatAmount = moneyFormat(totalAmountData);
                if(formatAmount == 0){
                    Swal.fire({
                        icon: 'error',
                        text: 'Fatura secimi yapılmalıdır',
                    })
                }else{
                    window.location.href = '/approved-invoice.html';
                }
            },1000)
        })
    }

    const discountRequestOld = () => {
        const discountBtn  = document.getElementById('js-discount');
        discountBtn.addEventListener('click',()=>{
            setTimeout(()=>{
                const totalAmountData  = localStorage.getItem("totalAmount");
                const formatAmount = moneyFormat(totalAmountData);
                if(formatAmount >= 200.000){
                    Swal.fire(
                        '200.000 üzeri onay gerekmektedir',
                      ).then(function () {
                        window.location.href = '/fatura-detay.html';
                    });
                }else if(formatAmount ==  0){
                    Swal.fire({
                        icon: 'error',
                        text: 'Fatura secimi yapılmalıdır',
                    })
                }else{
                    window.location.href = '/fatura-detay.html';
                }
            },1000)
        })
    }



    return {
        init,
    };
}());

export default invoice;
