// https://docs.flagsmith.com/clients/javascript#initialisation-options
// code and comments by @gnumoreno and @MatheusLasserre (github ids)
const debug = 0
flagsmith.init({
  // Dev environment key: iefBdPk5jLjp3WfFjiB4MS
  // Prod environment key: B7PbVXEWTCGhTD3njUxoL3
  environmentID: 'iefBdPk5jLjp3WfFjiB4MS', // Required, the environment ID for your environment

  api: 'https://edge.api.flagsmith.com/api/v1/', // Defaults to Flagsmith edge API
  enableAnalytics: true, // See https://docs.flagsmith.com/flag-analytics/ for more info

  // Using caching options you're reducing the number of api calls for each user.
  // For example, if the ttl for your cache is 600000ms, basically, your cache is going to be refreshed only after 10 minutes.
  cacheFlags: true, // stores flags in localStorage cache
  cacheOptions: {
    ttl: 10, // Time to Live in ms -- Default: 0. Try changing it to 1 min (60000 ms) and see what happens.
    skipAPI: true, // If cache is available, get data from cache. Default: false.
  },
  // If you are using the Free plan, StartUp plan or Self-Hosting you don't have real time available.
  // This feature is only available for Scale Up and Enterprise plan. See https://docs.flagsmith.com/advanced-use/real-time-flags
  // realTime: true,
  // Set as a identity if you want to fetch flags only for this specific identity.
  // identity: 'some_identity',
  // Set as a trait if you want to fetch flags only for this specific trait.
  // traits: { age: 21, country: 'England', employee: true },

  onChange: (oldFlags, params) => {
    document.getElementById('loading').classList.add('hidden')
    document.getElementById('content').classList.remove('hidden')
    // Occurs whenever flags are changed
    const { isFromServer } = params //determines if the update came from the server or localStorage cache
    const jsonTextBox = flagsmith.hasFeature('json_textbox')
    const flagsJson = flagsmith.getAllFlags()
    const indentValue = flagsmith.getValue('json_textbox', {
      json: true,
    })
    const button = flagsmith.hasFeature('new_button')
    const colouredButton = flagsmith.hasFeature('coloured_button')
    const colouredButtonValue = flagsmith.getValue('coloured_button')
    const fontSize = flagsmith.hasFeature('font_size')
    const fontSizeValue = flagsmith.getValue('font_size')
    const showIcons = flagsmith.hasFeature('show_footer_icons')
    const announcement = flagsmith.hasFeature('announcement')
    const announcementValue = flagsmith.getValue('announcement')
    const images = flagsmith.hasFeature('images')
    //  Check if the update is from server, otherwise, its the default flags.
    // If default flags is not defined, all values will be undefined.
    // All getters should be used outside the server check, because they need to be called BEFORE the server can send the update.
    if (isFromServer) {

      const jsonTextBoxEl = document.getElementById('json-text-box')
      if (jsonTextBox) {
        jsonTextBoxEl.innerHTML = JSON.stringify(
          flagsJson,
          '',
          indentValue.indent,
        )
        jsonTextBoxEl.classList.remove('hidden')
      } else {
        jsonTextBoxEl.classList.add('hidden')
      }

      const buttonEl = document.getElementById('button')
      if (button) {
        buttonEl.classList.remove('hidden')
      } else {
        buttonEl.classList.add('hidden')
      }

      const colouredButtonEl = document.getElementById('coloured-button')
      if (colouredButton) {
        colouredButtonEl.classList.remove('hidden')
        colouredButtonEl.style.backgroundColor = colouredButtonValue
      } else {
        colouredButtonEl.classList.add('hidden')
      }

      const featuresTableEl = document.getElementById('features')
      const listEl = document.getElementById('list')
      if (fontSize) {
        featuresTableEl.style.fontSize = fontSizeValue + 'px'
        listEl.style.fontSize = fontSizeValue + 'px'
      } else {
        featuresTableEl.style.fontSize = '16px'
        listEl.style.fontSize = '16px'
      }

      const showIconsEl = document.getElementById('icons')
      if (showIcons) {
        showIconsEl.classList.remove('hidden')
      } else {
        showIconsEl.classList.add('hidden')
      }

      const announcementEl = document.getElementById('announcement')
      if (announcement) {
        announcementEl.classList.remove('hidden')
        announcementEl.innerHTML = announcementValue
      } else {
        announcementEl.classList.add('hidden')
      }

      const imagesEl = document.getElementById('images')
      if (images) {
        imagesEl.classList.remove('hidden')
      } else {
        imagesEl.classList.add('hidden')
      }

      const loginButton = document.getElementById('js-login')
      const logoutButton = document.getElementById('js-logout')

      if (flagsmith.identity) {
        loginButton.classList.add('hidden')
        logoutButton.classList.remove('hidden')
      } else {
        loginButton.classList.remove('hidden')
        logoutButton.classList.add('hidden')
      }
    }
    // To enable debug mode, set debug to 1 on line 3.
    if (debug) {
      console.log('is_Server', isFromServer)
      console.log('allFlags', flagsJson)
      console.log('json_textbox', jsonTextBox, indentValue)
      console.log('font_size', fontSize, fontSizeValue)
      console.log('announcement', announcement, announcementValue)
      console.log('new_button', button)
      console.log('coloured_button', colouredButton, colouredButtonValue)
    }
  },
})



function login(formData) {
  formData.preventDefault()
  const email = formData.target.email.value
  flagsmith.identify(email)
  flagsmith.setTrait('email', email)
  hideModal()
}
document.getElementById('login-form').addEventListener('submit', login)

function showModal() {
  document.getElementById('modal').classList.remove('hidden')
}
document.getElementById('js-login').addEventListener('click', showModal)

function hideModal() {
  document.getElementById('modal').classList.add('hidden')
}
document.getElementById('cancel-login').addEventListener('click', hideModal)

function logout() {
  flagsmith.logout()
  hideModal()
}
document.getElementById('js-logout').addEventListener('click', logout)
