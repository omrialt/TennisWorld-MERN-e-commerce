const SideNav = () => {
  return (
    <div
      className="flex-shrink-0 p-3 bg-dark text-white
     
      "
      style={{ height: "100%", width: "10vw" }}
    >
      <ul className="list-unstyled ps-0">
        <li className="mb-1 ">
          <button
            className="btn text-white btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#home-collapse"
            aria-expanded="false"
          >
            Home
          </button>
          <div className="collapse" id="home-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li className="text-white">
                <a href="#" className="link-white rounded text-decoration-none">
                  Overview
                </a>
              </li>
              <li>
                <a href="#" className="link-white rounded text-decoration-none">
                  Updates
                </a>
              </li>
              <li>
                <a href="#" className="link-white rounded text-decoration-none">
                  Reports
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn text-white btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#dashboard-collapse"
            aria-expanded="false"
          >
            Dashboard
          </button>
          <div className="collapse" id="dashboard-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a href="#" className="link-white rounded text-decoration-none">
                  Overview
                </a>
              </li>
              <li>
                <a href="#" className="link-white rounded text-decoration-none">
                  Weekly
                </a>
              </li>
              <li>
                <a href="#" className="link-white rounded text-decoration-none">
                  Monthly
                </a>
              </li>
              <li>
                <a href="#" className="link-white rounded text-decoration-none">
                  Annually
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn text-white btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#orders-collapse"
            aria-expanded="false"
          >
            Orders
          </button>
          <div className="collapse" id="orders-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a href="#" className="link-white rounded text-decoration-none">
                  New
                </a>
              </li>
              <li>
                <a href="#" className="link-white rounded text-decoration-none">
                  Processed
                </a>
              </li>
              <li>
                <a href="#" className="link-white rounded text-decoration-none">
                  Shipped
                </a>
              </li>
              <li>
                <a href="#" className="link-white rounded text-decoration-none">
                  Returned
                </a>
              </li>
            </ul>
          </div>
        </li>
        <li className="border-top my-3"></li>
        <li className="mb-1">
          <button
            className="btn text-white btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#account-collapse"
            aria-expanded="false"
          >
            Account
          </button>
          <div className="collapse" id="account-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li>
                <a href="#" className="link-white rounded text-decoration-none">
                  New...
                </a>
              </li>
              <li>
                <a href="#" className="link-white rounded text-decoration-none">
                  Profile
                </a>
              </li>
              <li>
                <a href="#" className="link-white rounded text-decoration-none">
                  Settings
                </a>
              </li>
              <li>
                <a href="#" className="link-white rounded text-decoration-none">
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default SideNav;
<div className="sidenav" style={{ height: "100%", width: "10vw" }}>
  <ul className="nav flex-column pt-3 bg-dark h-100">
    <li>
      <li class="mt-1 text-nowrap">
        <a href="#" class="nav-link text-white" routerLinkActive="active">
          <i className="bi bi-person"></i>
          <span className=" ms-3">Hey</span>
        </a>
      </li>
    </li>
    <li>
      <li class="mt-1 text-nowrap">
        <a href="#" class="nav-link text-white" routerLinkActive="active">
          <i className="bi bi-person"></i>
          <span className=" ms-3">Hey</span>
        </a>
      </li>
    </li>
    <li>
      <li class="mt-1 text-nowrap">
        <a href="#" class="nav-link text-white" routerLinkActive="active">
          <i className="bi bi-person"></i>
          <span className=" ms-3">Hey</span>
        </a>
      </li>
    </li>
    <li>
      <li class="mt-1 text-nowrap">
        <a href="#" class="nav-link text-white" routerLinkActive="active">
          <i className="bi bi-person"></i>
          <span className=" ms-3">Hey</span>
        </a>
      </li>
    </li>
    <li>
      <li class="mt-1 text-nowrap">
        <a href="#" class="nav-link text-white" routerLinkActive="active">
          <i className="bi bi-person"></i>
          <span className=" ms-3">Hey</span>
        </a>
      </li>
    </li>
  </ul>
</div>;
