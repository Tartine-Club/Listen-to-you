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
    if (!form.elements.consent.checked || !form.elements.charte.checked) {
      done.textContent = "Cochez les deux cases : l'accord pour qu'Isabelle utilise vos informations, et la charte de participation.";
      done.hidden = false;
      return;
    }
    // Chambres écrites dans le HTML de chaque page ; la page Yaya n'en a pas encore
    const room = form.elements.room ? ` (${form.elements.room.selectedOptions[0].text.split(" · ")[0].toLowerCase()})` : "";
    done.textContent = `Merci ${name}. Votre demande${room} est prête. Ce formulaire est une maquette : il doit être relié à un service d'envoi pour transmettre les demandes.`;
    done.hidden = false;
  });

  // Carrousel d'avis : flèches et compteur ; le glisser du doigt est natif (scroll-snap)
  document.querySelectorAll(".slider").forEach(slider => {
    const track = slider.querySelector(".slides");
    const prev = slider.querySelector(".slider-prev"), next = slider.querySelector(".slider-next");
    const count = slider.querySelector(".slider-count span"), last = track.children.length - 1;
    const index = () => Math.round(track.scrollLeft / track.clientWidth);
    const go = i => track.scrollTo({ left: Math.max(0, Math.min(last, i)) * track.clientWidth });
    const update = () => { const i = index(); count.textContent = i + 1; prev.disabled = i === 0; next.disabled = i === last; };
    prev.addEventListener("click", () => go(index() - 1));
    next.addEventListener("click", () => go(index() + 1));
    track.addEventListener("keydown", e => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); go(index() + (e.key === "ArrowRight" ? 1 : -1)); }
    });
    track.addEventListener("scroll", () => requestAnimationFrame(update), { passive: true });
    update();
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
