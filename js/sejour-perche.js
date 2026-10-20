(() => {
  // Formulaire : maquette, pas encore relié à un service d'envoi
  const form = document.getElementById("form");
  const done = document.getElementById("formDone");
  form.addEventListener("submit", e => {
    e.preventDefault();
    const name = form.elements.firstname.value.trim();
    const last = form.elements.lastname.value.trim();
    const email = form.elements.email.value.trim();
    if (!name || !last || !/^\S+@\S+\.\S+$/.test(email)) {
      done.textContent = "Indiquez votre prénom, votre nom et une adresse e-mail valide pour qu'Isabelle puisse vous répondre.";
      done.hidden = false;
      return;
    }
    if (!form.elements.consent.checked) {
      done.textContent = "Cochez la case d'accord pour qu'Isabelle puisse utiliser vos informations et vous répondre.";
      done.hidden = false;
      return;
    }
    // Chambres écrites dans le HTML de chaque page ; la page Yaya n'en a pas encore
    const room = form.elements.room ? ` (${form.elements.room.selectedOptions[0].text.split(" · ")[0].toLowerCase()})` : "";
    done.textContent = `Merci ${name}. Votre demande${room} est prête. Ce formulaire est une maquette : il doit être relié à un service d'envoi pour transmettre les demandes.`;
    done.hidden = false;
  });

  // Programme : sur mobile, seul le premier jour reste déplié
  if (matchMedia("(max-width: 760px)").matches) document.querySelectorAll(".day").forEach((d, i) => { if (i) d.open = false; });

  // Barre mobile masquée sur le hero et sur la réservation, où le bouton est déjà visible
  const mbar = document.getElementById("mbar");
  const hero = document.getElementById("top");
  const booking = document.getElementById("reserver");
  function onScroll() {
    const b = booking.getBoundingClientRect();
    mbar.hidden = hero.getBoundingClientRect().bottom > 0 || (b.top < innerHeight && b.bottom > 0);
  }
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();
})();
