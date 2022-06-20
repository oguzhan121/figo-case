import '../scss/app.scss';

import { header, footer, form } from './components';
import { login,logout,invoice,invoiceBasket } from './modules';

(function () {
  //Components
  header.init();
  footer.init();
  form.init();

  // Modules
  login.init();
  logout.init();
  invoice.init();
  invoiceBasket.init()
}());

