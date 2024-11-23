export function Contact() {
  function handleSubmit() {
    console.log("Form submitted");
  }

  return (
    <div>
      <h1>Contact Page</h1>
      <p>Contact us for any inquiries or feedback.</p>
      <p>Email: contact@borgblogs.com</p>
      <p>Alternatively, you can fill out the contact form below:</p>

      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input type="text" name="name" placeholder="Name" />
        <label>Email: </label>
        <input type="email" name="email" placeholder="Email" />
        <label>Message: </label>
        <textarea name="message" placeholder="Message"></textarea>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
