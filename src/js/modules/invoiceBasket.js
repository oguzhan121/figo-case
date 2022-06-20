/**
 * Form 
 *
 * @file InvoiceBasket.js
 */

import { $, Swal } from '../vendors';
import '../vendors/datatable/jquery.dataTables.min';
import '../vendors/datatable/dataTables.buttons.min';
import '../vendors/datatable/buttons.html5.min';
import { loggedInUser,loggedInUserId } from '../utils/contants';
import { moneyFormat } from '../utils/helper';
import jsonData from '../utils/data.json';


const invoiceBasket = (function () {
    const init = function () {
        if ($('#js-approved-invoice').length > 0) {
            if(loggedInUser == undefined){
                window.location.href = '/';
             }
            totalAmountGet();
            selectedInvoiceGet();
            confirmDiscountShow();
            clickConfrimDiscountBtn();
        }
    };

    const datatableOnLoad = () => {
        $('#js-table-invoice-selected').DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.12/i18n/Turkish.json"
            },
        });
    }

    const totalAmountGet = () => {
        const totalAmountElement = document.querySelector('.c-table__total')
        let totalAmount = localStorage.getItem('totalAmount');
        totalAmountElement.innerHTML = `<span class="c-table__total__text">Toplam Tutar:</span><span id="js-total-amount"> ${moneyFormat(totalAmount)}</span>`;
    }

    const selectedInvoiceGet = () => {
        let jsonItems = jsonData.Invoices;
        let selectedItems = [];
        let checkListId = localStorage.getItem('selectedInvoiceID');
        jsonItems.forEach((elements, items) => {
            if (checkListId.includes(elements.Id)) {
                selectedItems.push(elements);
            }
        });

        let tbodyBLock = document.getElementById('c-table__listing-basket');
        selectedItems.forEach((elements, items) => {
            if (loggedInUserId == elements.UserId) {
                tbodyBLock.innerHTML +=
                    `<tr>
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
        datatableOnLoad();
    }


    const confirmDiscountShow = () => {
        const confirmInvoiceBtn = document.querySelector('.c-table__confirm__invoice');
        const totalAmountData = localStorage.getItem("totalAmount");

        const formatAmount = moneyFormat(totalAmountData);
        if (formatAmount >= 200.000) {
            confirmInvoiceBtn.innerHTML = `<span>200.00 TL üzeri iskonto için onay gerekmektedir.</span><a id="js-confirm-discount" class="c-button c-button--primary">Onaylıyor musunuz?</a>`;
        } else {
            approvedInvoiceMessage();
        }
    }

    const approvedInvoiceMessage = () => {
        const alertElement = document.querySelector('.c-alert');
        alertElement.classList.add('c-alert__success')
        alertElement.classList.add('js-active')
        alertElement.innerHTML = `<span aria-hidden="true" id="js-hide-alert">&times;</span><p>İşleminiz başarılı ile gerçekleşmiştir.</p>`;
    }
    const clickConfrimDiscountBtn = () => {
        const confirmInvoiceBtn = document.querySelector('.c-table__confirm__invoice');
        const confirmBtn = document.getElementById('js-confirm-discount');
        confirmBtn.addEventListener('click',() => {
            approvedInvoiceMessage();
            confirmInvoiceBtn.classList.add('js-hide');
        })
    }



    return {
        init,
    };
}());

export default invoiceBasket;
