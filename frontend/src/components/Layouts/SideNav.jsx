import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div
      className="flex-shrink-0 pt-5 px-3 mt-3  bg-white
     
      "
      style={{ height: "100%", width: "10vw" }}
    >
      <ul className="list-unstyled ps-0">
        <li className="mb-1">
          <button
            className="btn text-dark btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#racket-collapse"
            aria-expanded="false"
          >
            Rackets
          </button>
          <div className="collapse" id="racket-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li className="py-1 px-4">
                <Link
                  to={`/choose/wilson/rackets`}
                  className="link-white rounded text-decoration-none"
                >
                  Wilson
                </Link>
              </li>
              <li className="py-1 px-4">
                <Link
                  to={`/choose/babolat/rackets`}
                  className="link-white rounded text-decoration-none"
                >
                  Babolat
                </Link>
              </li>
              <li className="py-1 px-4">
                <Link
                  to={`/choose/head/rackets`}
                  className="link-white rounded text-decoration-none"
                >
                  Head
                </Link>
              </li>
              <li className="py-1 px-4">
                <Link
                  to={`/choose/prince/rackets`}
                  className="link-white rounded text-decoration-none"
                >
                  Prince
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn text-dark btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#string-collapse"
            aria-expanded="false"
          >
            Strings
          </button>
          <div className="collapse" id="string-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li className="py-1 px-4">
                <Link
                  to={`/choose/wilson/strings`}
                  className="link-white rounded text-decoration-none"
                >
                  Wilson
                </Link>
              </li>
              <li className="py-1 px-4">
                <Link
                  to={`/choose/babolat/strings`}
                  className="link-white rounded text-decoration-none"
                >
                  Babolat
                </Link>
              </li>
              <li className="py-1 px-4">
                <Link
                  to={`/choose/head/strings`}
                  className="link-white rounded text-decoration-none"
                >
                  Head
                </Link>
              </li>
              <li className="py-1 px-4">
                <Link
                  to={`/choose/prince/strings`}
                  className="link-white rounded text-decoration-none"
                >
                  Prince
                </Link>
              </li>
              <li className="py-1 px-4">
                <Link
                  to={`/choose/luxilon/strings`}
                  className="link-white rounded text-decoration-none"
                >
                  Luxilon
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn text-dark btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#bags-collapse"
            aria-expanded="false"
          >
            Bags
          </button>
          <div className="collapse" id="bags-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li className="py-1 px-4">
                <Link
                  to={`/choose/wilson/bags`}
                  className="link-white rounded text-decoration-none"
                >
                  Wilson
                </Link>
              </li>
              <li className="py-1 px-4">
                <Link
                  to={`/choose/babolat/bags`}
                  className="link-white rounded text-decoration-none"
                >
                  Babolat
                </Link>
              </li>
              <li className="py-1 px-4">
                <Link
                  to={`/choose/head/bags`}
                  className="link-white rounded text-decoration-none"
                >
                  Head
                </Link>
              </li>
              <li className="py-1 px-4">
                <Link
                  to={`/choose/prince/bags`}
                  className="link-white rounded text-decoration-none"
                >
                  Prince
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn text-dark btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#grip-collapse"
            aria-expanded="false"
          >
            Grips
          </button>
          <div className="collapse" id="grip-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li className="py-1 px-4">
                <Link
                  to={`/choose/wilson/grips`}
                  className="link-white rounded text-decoration-none"
                >
                  Wilson
                </Link>
              </li>
              <li className="py-1 px-4">
                <Link
                  to={`/choose/babolat/grips`}
                  className="link-white rounded text-decoration-none"
                >
                  Babolat
                </Link>
              </li>
              <li className="py-1 px-4">
                <Link
                  to={`/choose/head/grips`}
                  className="link-white rounded text-decoration-none"
                >
                  Head
                </Link>
              </li>
              <li className="py-1 px-4">
                <Link
                  to={`/choose/prince/grips`}
                  className="link-white rounded text-decoration-none"
                >
                  Prince
                </Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="mb-1">
          <button
            className="btn text-dark btn-toggle align-items-center rounded collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#balls-collapse"
            aria-expanded="false"
          >
            Balls
          </button>
          <div className="collapse" id="balls-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
              <li className="py-1 px-4">
                <Link
                  to={`/choose/wilson/balls`}
                  className="link-white rounded text-decoration-none"
                >
                  Wilson
                </Link>
              </li>
              <li className="py-1 px-4">
                <Link
                  to={`/choose/babolat/balls`}
                  className="link-white rounded text-decoration-none"
                >
                  Babolat
                </Link>
              </li>
              <li className="py-1 px-4">
                <Link
                  to={`/choose/penn/balls`}
                  className="link-white rounded text-decoration-none"
                >
                  Penn
                </Link>
              </li>
            </ul>
          </div>
        </li>

        <li className="border-top my-3"></li>
      </ul>
    </div>
  );
};
export default SideNav;
