import {  h, render } from 'https://unpkg.com/preact@latest?module';
import { useState } from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm@latest?module';
import { login, init } from "./map.mjs";

window.html = htm.bind(h);

const Login = () => {
  const [email, setEmail] = useState("definitely@notacult.com")
  const [password, setPassword] = useState("")
  const [isSubmitting, setSubmitting] = useState(false);
  const [error, setError] = useState("")
  const [isDone, setDone] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);

    try {
      await login(email, password)
      setSubmitting(false);
      await init()
      setDone(true);
    } catch (e) {
      console.log("here")
      setError("Wrong password idiot")
      setSubmitting(false);
    }
  }

  function handleChange() {
    setError("")
  }

  if (isDone) {
    return html`<div />`
  }

  return html`
    <div class="modal">
      <div class="modal-overlay"></div>
      <form method="post" class="login" onSubmit=${handleSubmit}>
        <input 
          type="email" 
          name="email" 
          onInput=${(e) => {
            setEmail(e.target.value)
            setError("")
          }} 
          value=${email} 
        />  
        <input 
          type="password"
          name="password"
          placeholder="Password"
          onInput=${(e) => {
            setPassword(e.target.value)
            setError("")
          }} 
          value=${password} 
         />  
        <button disabled=${isSubmitting}>login</button>
        
        ${error !== "" && html`
          <span class="error">${error}</span>
        `}
      </form>
    </div>
  `
}

export default function() {
  render(h(Login), document.body);
}
