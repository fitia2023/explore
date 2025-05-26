export interface ContactPayload {
  nom: string;
  prenom: string;
  mail: string;
  message: string;
  date_envoie: string;
}
<<<<<<< HEAD
 
=======

>>>>>>> 6bacd2ef821782d9e9c1ee03a76c341ac5f0cf25
export async function sendContact(payload: ContactPayload) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
<<<<<<< HEAD
 
=======

>>>>>>> 6bacd2ef821782d9e9c1ee03a76c341ac5f0cf25
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erreur lors de l’envoi du message');
  }
<<<<<<< HEAD
 
=======

>>>>>>> 6bacd2ef821782d9e9c1ee03a76c341ac5f0cf25
  return await response.json();
}