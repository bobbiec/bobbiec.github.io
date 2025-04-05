const examples = [
  {
    title: "Artists",
    text: `<!-- Austin Kleon, via https://austinkleon.com/2022/10/24/comfort-work/ . Based on the New York Times print edition, May 24, 2020 -->

<!-- https://www.nytimes.com/2020/05/23/arts/design/houston-art-museum-reopen-virus.html -->
[Mr. Tinterow has several friends in New York who have died from Covid-19, the disease caused by the coronavirus.“]Artists [galleries, and museums are suffering right now,” he said, “but I have been saying for some time that the contemporary art world has reached a fever pitch.”]

<!-- https://www.nytimes.com/2020/05/24/us/17-year-cicadas-virginia.html -->
[The billions that are left alive can then mate in peace and lay their eggs. The adults] quickly die off after their work is done[. Once their eggs hatch, the nymphs fall to the ground, where they will nestle into the earth for the next 17 years.]

[Entomologists believe that periodical cicadas evolved to emerge every 13 to 17 years to avoid syncing up with the population boom]s o[f their predators.]

[The predictability of the cycle makes it possible for farmers to ]plan ahead,[ he said.]

[For that reason, Professor Pfeiffer recommends that growers] avoid [planting new trees in the year or two leading up to an emergence, he said.]

[Ms. Noonkester said she expected that cicadas would come from other parts of the state and desc]end [soon on her young trees to lay eggs. All she can do, she said, besides hop]ing [that a majority of them will stick to the forest, is prune any twigs that they do damage and keep grabbing and stomping errant cicadas.]
`,
  },
  {
    title: "Excelint (Every Mess)",
    text: `<!-- me (Bobbie Chen), based on my blog post "Every app is a messaging app" https://digitalseams.com/blog/every-app-is-a-messaging-app -->

#### Every [app is a] mess[aging app]

[3/23/2025]

[Every application] will be [used for messaging. What do spreadsheets, email dr]a[fts, and system notifications have in common? Inventive people use them in creative] way[s] to [send and] receive [messages. People] love [to talk to each other], and it's [incredibly hard to stop them. [Here are a few examples.]

##### Real[-time chat, through document editing]

[Messaging via] Excel? In t[he music video for "Dilemma" (2002), Kelly Rowland and Nelly were mocked for this [""text message"" in the spreadsheet app on a Nokia 9210 Communicator:]

![Spreadsheet with text in cell: "WHERE YOU AT? HOLLA WHEN YOU GE..."](https://images.squarespace-cdn.com/content/v1/598a2436f7e0ab837d08f4c6/0542a949-a92b-4126-ad16-68071eb9c34f/dilemma-spreadsheet-texting.png)`,
  },
  {
    title: "Computer sad :(",
    text: `<!-- The earliest version of this I found was https://virtualgirladvance.tumblr.com/post/777249377277411328 -->

A COMPUTER CAN NEVER BE HELD [ACCOUNTABLE]  

THEREFORE [A] COMPUTER [MU]S[T NEVER  M]A[KE A MANAGEMENT]D[ECISION]

-- IBM training manual (1979)`,
  },
  {
    title: "Custom",
    text: `Enter your own text here.

Use [brackets] to mark text that will be blacked out.`,
  },
]

const inputText = document.getElementById("inputText")
const displayDiv = document.getElementById("display")
const tabsContainer = document.getElementById("tabs")
const tabButtons = []

let customText = examples[3].text
let currentTab = 1

// Function to handle URL query parameters
function getTabFromUrl() {
  const params = new URLSearchParams(window.location.search)
  const tabIndex = parseInt(params.get("poem"))
  return !isNaN(tabIndex) && tabIndex >= 1 && tabIndex <= examples.length
    ? tabIndex
    : 1
}

// Function to update URL with current tab
function updateUrl() {
  const url = new URL(window.location)
  url.searchParams.set("poem", currentTab)
  window.history.pushState({}, "", url)
}

// Create tabs
examples.forEach((example, index) => {
  const tab = document.createElement("button")
  tab.className = "tab-button"
  tab.textContent = example.title
  tab.onclick = () => switchExample(index + 1)
  tabsContainer.appendChild(tab)
  tabButtons.push(tab)
})

function switchExample(index) {
  if (currentTab === index) return // Don't switch to same tab

  if (currentTab === examples.length) {
    customText = inputText.value
  }

  // Update active tab - more efficient than querySelectorAll
  tabButtons[currentTab - 1].classList.remove("active")
  tabButtons[index - 1].classList.add("active")

  // Update content
  inputText.value =
    index === examples.length ? customText : examples[index - 1].text
  currentTab = index
  updateUrl() // Update URL when switching tabs
  render(inputText.value)
}

// Debounce the render function for input changes
let renderTimeout
function debouncedRender() {
  if (renderTimeout) clearTimeout(renderTimeout)
  renderTimeout = setTimeout(() => render(inputText.value), 10)
}

// Modified input handler
inputText.addEventListener("input", () => {
  if (currentTab !== examples.length) {
    customText = inputText.value
    switchExample(examples.length)
  } else {
    debouncedRender()
  }
})

function render(markdownText) {
  let renderedHTML = marked.parse(markdownText)
  renderedHTML = renderedHTML.replace(
    /\[(.*?)\]/g,
    '<span class="blackout">$1</span>'
  )
  displayDiv.innerHTML = renderedHTML
}

// Initial render
currentTab = getTabFromUrl()
tabButtons[currentTab - 1].classList.add("active")
inputText.value = examples[currentTab - 1].text
render(inputText.value)
