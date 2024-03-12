import React from "react";
import DashboardNavbar from "./DashboardNavbar";
import "./orders.css";
function Orders() {
  return (
    <div>
      <DashboardNavbar />
      <div>
        <div class=" mt-24 absolute lg:left-[260px]">
          <h2 class="font-bold text-xl">Order History</h2>
          <div className="table-responsive mt-5 ">
            <table className="table table-hover text-nowrap">
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th className="border-top-0 pt-0 pb-2"></th>
                  <th className="border-top-0 pt-0 pb-2">Order#</th>
                  <th className="border-top-0 pt-0 pb-2">Date&Time</th>
                  <th className="border-top-0 pt-0 pb-2">Product</th>
                  <th className="border-top-0 pt-0 pb-2">Status</th>
                  <th className="border-top-0 pt-0 pb-2">Staff</th>
                  <th className="border-top-0 pt-0 pb-2">Payment Method</th>
                  <th className="border-top-0 pt-0 pb-2"> Sales Type</th>
                  <th className="border-top-0 pt-0 pb-2">Amount</th>
                  <th className="border-top-0 pt-0 pb-2">Vat</th>
                  <th className="border-top-0 pt-0 pb-2">Discount</th>
                  <th className="border-top-0 pt-0 pb-2">Paid</th>
                  <th className="border-top-0 pt-0 pb-2"> Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ textAlign: "center" }}>
                  <td className="w-10px align-middle">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="product1"
                      />
                      <label className="form-check-label"></label>
                    </div>
                  </td>
                  <td className="align-middle">
                    <a href>0001</a>
                  </td>
                  <td className="align-middle">Thu 26 Nov, 12:23pm</td>
                  <td className="align-middle"> Vape Kit</td>
                  <td className="align-middle">Successful</td>
                  <td className="py-1 align-middle">
                    <span> Abdullah</span>
                  </td>
                  <td className="align-middle">
                    <span>Card</span>
                  </td>
                  <td className="align-middle">Just Taste</td>
                  <td className="align-middle">£2.99</td>
                  <td className="align-middle">£34.99</td>
                  <td className="align-middle">0</td>
                  <td className="align-middle">£34.99</td>
                  <td className="align-middle">
                    <button class="btn bg-[#bd9229] text-[12px] text-white">
                      Edit
                    </button>{" "}
                    <button class="btn bg-[#bd9229] text-[12px] text-white">
                      Delete
                    </button>
                  </td>
                </tr>

                <tr style={{ textAlign: "center" }}>
                  <td className="w-10px align-middle">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="product1"
                      />
                      <label className="form-check-label"></label>
                    </div>
                  </td>
                  <td className="align-middle">
                    <a href>0001</a>
                  </td>
                  <td className="align-middle">Thu 26 Nov, 12:23pm</td>
                  <td className="align-middle"> Vape Kit</td>
                  <td className="align-middle">Successful</td>
                  <td className="py-1 align-middle">
                    <span> Abdullah</span>
                  </td>
                  <td className="align-middle">
                    <span>Card</span>
                  </td>
                  <td className="align-middle">Just Taste</td>
                  <td className="align-middle">£2.99</td>
                  <td className="align-middle">£34.99</td>
                  <td className="align-middle">0</td>
                  <td className="align-middle">£34.99</td>
                  <td className="align-middle">
                    <button class="btn bg-[#bd9229] text-[12px] text-white">
                      Edit
                    </button>{" "}
                    <button class="btn bg-[#bd9229] text-[12px] text-white">
                      Delete
                    </button>
                  </td>
                </tr>

                <tr style={{ textAlign: "center" }}>
                  <td className="w-10px align-middle">
                    <div className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="product1"
                      />
                      <label className="form-check-label"></label>
                    </div>
                  </td>
                  <td className="align-middle">
                    <a href>0001</a>
                  </td>
                  <td className="align-middle">Thu 26 Nov, 12:23pm</td>
                  <td className="align-middle"> Vape Kit</td>
                  <td className="align-middle">Successful</td>
                  <td className="py-1 align-middle">
                    <span> Abdullah</span>
                  </td>
                  <td className="align-middle">
                    <span>Card</span>
                  </td>
                  <td className="align-middle">Just Taste</td>
                  <td className="align-middle">£2.99</td>
                  <td className="align-middle">£34.99</td>
                  <td className="align-middle">0</td>
                  <td className="align-middle">£34.99</td>
                  <td className="align-middle">
                    <button class="btn bg-[#bd9229] text-[12px] text-white">
                      Edit
                    </button>{" "}
                    <button class="btn bg-[#bd9229] text-[12px] text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;