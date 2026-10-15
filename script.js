 const root =
      document.documentElement;

    const themeToggle =
      document.getElementById(
        "themeToggle"
      );

    const themeIcon =
      document.getElementById(
        "themeIcon"
      );

    const menuToggle =
      document.getElementById(
        "menuToggle"
      );

    const navMenu =
      document.getElementById(
        "navMenu"
      );

    const navLinks =
      [...document.querySelectorAll(
        ".nav-menu a"
      )];


    /* =======================================================
       THEME
    ======================================================== */

    const savedTheme =
      localStorage.getItem(
        "theme"
      );

    if (savedTheme) {
      root.dataset.theme =
        savedTheme;
    }


    const sunIcon = `
      <circle cx="12" cy="12" r="5"></circle>
      <path d="M12 1v2"></path>
      <path d="M12 21v2"></path>
      <path d="M4.22 4.22l1.42 1.42"></path>
      <path d="M18.36 18.36l1.42 1.42"></path>
      <path d="M1 12h2"></path>
      <path d="M21 12h2"></path>
      <path d="M4.22 19.78l1.42-1.42"></path>
      <path d="M18.36 5.64l1.42-1.42"></path>
    `;


    const moonIcon = `
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
    `;


    function updateThemeIcon() {

      const isLight =
        root.dataset.theme ===
        "light";

      themeIcon.innerHTML =
        isLight
          ? moonIcon
          : sunIcon;
    }


    updateThemeIcon();


    themeToggle.addEventListener(
      "click",
      () => {

        const nextTheme =
          root.dataset.theme ===
          "light"
            ? "dark"
            : "light";

        root.dataset.theme =
          nextTheme;

        localStorage.setItem(
          "theme",
          nextTheme
        );

        updateThemeIcon();
      }
    );


    /* =======================================================
       MOBILE MENU
    ======================================================== */

    function closeMenu() {

      navMenu.classList.remove(
        "is-open"
      );

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      document.body.style.overflow =
        "";
    }


    menuToggle.addEventListener(
      "click",
      () => {

        const open =
          navMenu.classList.toggle(
            "is-open"
          );

        menuToggle.setAttribute(
          "aria-expanded",
          String(open)
        );

        document.body.style.overflow =
          open ? "hidden" : "";
      }
    );


    navLinks.forEach(
      (link) => {

        link.addEventListener(
          "click",
          closeMenu
        );

      }
    );


    /* =======================================================
       SMOOTH SCROLL
    ======================================================== */

    document
      .querySelectorAll(
        'a[href^="#"]'
      )
      .forEach(
        (link) => {

          link.addEventListener(
            "click",
            (event) => {

              const id =
                link.getAttribute(
                  "href"
                );

              const target =
                document.querySelector(
                  id
                );

              if (!target) {
                return;
              }

              event.preventDefault();

              target.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });

            }
          );

        }
      );


    /* =======================================================
       ACTIVE NAV
    ======================================================== */

    const sections =
      navLinks
        .map(
          (link) =>
            document.querySelector(
              link.getAttribute("href")
            )
        )
        .filter(Boolean);


    const sectionObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }

              navLinks.forEach(
                (link) => {

                  link.classList.toggle(
                    "is-active",
                    link.getAttribute(
                      "href"
                    ) ===
                    `#${entry.target.id}`
                  );

                }
              );

            }
          );

        },
        {
          rootMargin:
            "-35% 0px -55% 0px"
        }
      );


    sections.forEach(
      (section) =>
        sectionObserver.observe(
          section
        )
    );


    /* =======================================================
       REVEAL
    ======================================================== */

    const revealElements =
      document.querySelectorAll(
        ".reveal"
      );


    const revealObserver =
      new IntersectionObserver(
        (entries, observer) => {

          entries.forEach(
            (entry) => {

              if (
                !entry.isIntersecting
              ) {
                return;
              }

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );

            }
          );

        },
        {
          threshold: .12,
          rootMargin:
            "0px 0px -50px 0px"
        }
      );


    revealElements.forEach(
      (element, index) => {

        element.style.transitionDelay =
          `${Math.min(
            index * 65,
            320
          )}ms`;

        revealObserver.observe(
          element
        );

      }
    );


    /* =======================================================
       DESKTOP PHOTO TILT
    ======================================================== */

    const photoCard =
      document.querySelector(
        ".hero__visual"
      );


    if (photoCard) {

      photoCard.addEventListener(
        "mousemove",
        (event) => {

          if (
            window.innerWidth < 900
          ) {
            return;
          }

          const rect =
            photoCard.getBoundingClientRect();


          const x =
            (event.clientX -
              rect.left) /
            rect.width;


          const y =
            (event.clientY -
              rect.top) /
            rect.height;


          const rotateX =
            (0.5 - y) * 5;


          const rotateY =
            (x - 0.5) * 5;


          photoCard.style.transform =
            `
              perspective(1100px)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
            `;
        }
      );


      photoCard.addEventListener(
        "mouseleave",
        () => {

          photoCard.style.transform =
            "rotate(1.8deg)";
        }
      );

    }


    /* =======================================================
       CLOSE MENU WITH ESC
    ======================================================== */

    document.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Escape"
        ) {
          closeMenu();
        }

      }
    );
