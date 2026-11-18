const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open'); navToggle.setAttribute('aria-expanded', 'false');
}));

const stories = {
  maria: { title: '“Dos meses sin respuestas”', text: 'Yo recuerdo la noche en la que encontré a mi hijo consumiendo drogas. Intenté hablar con él desde el miedo y el amor, pero él salió de casa. Pasaron dos meses sin una llamada ni una respuesta. Cuando recibí la llamada de la morgue, sentí que el tiempo se detenía: primero llegó la incredulidad, después la culpa, la rabia y un dolor que no sabía dónde poner. Cuento esta historia para que otras familias hablen a tiempo, busquen apoyo y comprendan que el consumo y los entornos criminales pueden traer consecuencias que alcanzan a toda una familia. Este relato es ficticio y educativo.' },
  julian: { title: 'La visita de los domingos', text: 'Yo pienso mucho en los años en que trabajaba hasta tarde y en las conversaciones que dejé para después. Mi hijo comenzó a juntarse con personas que lo acercaron a decisiones cada vez más peligrosas. Cuando fue detenido y terminó en prisión, entendí que la culpa no era solo de una persona: había fallas, presiones y decisiones que debíamos mirar de frente. En cada visita de domingo, intento acompañarlo sin justificar lo ocurrido y le recuerdo que todavía puede asumir responsabilidad, reparar y construir otro camino. Comparto mi reflexión para invitar a madres, familias y jóvenes a pedir ayuda antes de que el daño sea mayor. Este relato es ficticio y educativo.' }
};
const dialog = document.querySelector('#story-dialog');
const closeDialog = document.querySelector('.dialog-close');
document.querySelectorAll('.story-open').forEach(button => button.addEventListener('click', () => {
  const story = stories[button.dataset.story];
  document.querySelector('#dialog-title').textContent = story.title;
  document.querySelector('#dialog-content').textContent = story.text;
  dialog.showModal();
}));
closeDialog.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });

const textArea = document.querySelector('#message');
const count = document.querySelector('#character-count');
textArea.addEventListener('input', () => { count.textContent = `${textArea.value.length} / 600`; });
const processDialog = document.querySelector('#process-dialog');
const processClose = document.querySelector('#process-close');
const demoConsent = document.querySelector('#demo-consent');
const completeDemo = document.querySelector('#complete-demo');
document.querySelector('#demo-button').addEventListener('click', () => {
  const message = textArea.value.trim();
  const preference = document.querySelector('input[name="attribution"]:checked').value;
  document.querySelector('#preview-copy').textContent = message || 'No escribiste ningún texto; esta vista muestra el proceso de cuidado.';
  document.querySelector('#preview-preference').textContent = `Preferencia de ejemplo: ${preference}.`;
  document.querySelector('#form-message').textContent = 'Vista del proceso abierta. Nada se ha enviado ni guardado.';
  demoConsent.checked = false;
  completeDemo.disabled = true;
  document.querySelector('#process-message').textContent = '';
  processDialog.showModal();
});
processClose.addEventListener('click', () => processDialog.close());
processDialog.addEventListener('click', event => { if (event.target === processDialog) processDialog.close(); });
demoConsent.addEventListener('change', () => { completeDemo.disabled = !demoConsent.checked; });
completeDemo.addEventListener('click', () => {
  document.querySelector('#process-message').textContent = 'Proceso finalizado: la historia será analizada y, al terminar, se enviará una confirmación para que pueda ser publicada.';
});
