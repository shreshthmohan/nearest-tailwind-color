import { select, color } from 'd3'
import colors from 'tailwindcss/colors'
import pkg from 'tailwindcss/package.json'
import { nearestColor } from './nearestColor'
import './styles/tailwind.css'

select('#tailwind-version').text(pkg.version)

const ignoreColors = [
  'inherit',
  'current',
  'transparent',
  'lightBlue',
  'warmGray',
  'trueGray',
  'coolGray',
  'blueGray',
]

function flattenColorList(colorList) {
  const flatColorList = []
  Object.keys(colorList).forEach(c => {
    if (!ignoreColors.includes(c)) {
      if (typeof colors[c] === 'string') {
        flatColorList.push({ name: c, value: colors[c] })
      } else {
        Object.keys(colors[c]).forEach(cc => {
          flatColorList.push({ name: `${c}-${cc}`, value: colors[c][cc] })
        })
      }
    }
  })
  return flatColorList
}

const flatColorList = flattenColorList(colors)

const defaultColor = '#000000'

const colorInputText = select('#color-input-text').attr('value', defaultColor)
const colorInput = select('#color-input').attr('value', defaultColor)
const showColor = select('#show-color')
const colorError = select('#color-error')
const showHex = select('#show-hex')
const showRgb = select('#show-rgb')
const showNearestTailwindColorContainer = select(
  '#show-nearest-tailwind-colors-container',
)

colorInput.on('change input', e => {
  colorInputText.property('value', e.target.value)
  showColor.style('background-color', e.target.value)

  showHex.text(color(e.target.value).formatHex())
  showRgb.text(color(e.target.value).formatRgb())

  const nearestTwColors = nearestColor(e.target.value, flatColorList)

  renderOutputColors(
    select('#nearest-color-table > tbody > tr'),
    select('#nearest-color-table > thead > tr'),
    e.target.value,
    nearestTwColors,
  )

  // showNearestTailwindColorContainer.selectAll('.nearest-color').remove()

  // const allColorDivs = showNearestTailwindColorContainer
  //   .selectAll('.nearest-color')
  //   .data(nearestTwColors)
  //   .join('div')
  //   .attr('class', 'nearest-color flex items-center')

  // allColorDivs.html('<div>test</div>')
  // .attr('class', 'w-12 h-8 border-2 border-white rounded-sm m-2 inline-block')
  // .style('background-color', d => d.fromValue)

  // allColorDivs
  //   .append('span')
  //   .text(d => `${d.from}: ${d.fromValue} (distance: ${d.distance.toFixed(0)})`)
})

colorInputText.on('change input', e => {
  const parsedColor = color(e.target.value)
  if (parsedColor) {
    colorInput.property('value', parsedColor.formatHex())
    showColor.style('background-color', parsedColor.formatHex())
    colorError.text(null)
  } else {
    colorError.text('Invalid color')
  }
})

function renderOutputColors(
  tbodyRowSelection,
  theadRowSelection,
  inputColor,
  colorArr,
) {
  theadRowSelection.text('')
  theadRowSelection
    .append('th')
    .text('Input color')
    .attr('class', 'font-normal py-3 px-5')
  theadRowSelection
    .append('th')
    .text('Nearest Tailwind Colors')
    .attr('colspan', colorArr.length)
    .attr('class', 'font-normal py-2')
  tbodyRowSelection
    .selectAll('td')
    .data([
      { fromValue: inputColor, from: 'input color', distance: 0 },
      ...colorArr,
    ])
    .join('td')
    .attr('class', d => `whitespace-nowrap  text-sm text-gray-500`)
    .html(
      (d, i) =>
        `<div class="px-3 py-4 flex flex-col items-center gap-1 ${
          i === 0 ? 'border-2' : ''
        } rounded border-gray-300">
          <div
            class="w-16 h-8 rounded mb-2"
            style="background-color: ${d.fromValue};">
          </div>
          <p class="text-black flex items-center gap-2 bg-gray-100 rounded pl-2">
            <span>${d.from}</span>
            <button class="border bg-gray-200 rounded-sm p-1">
              <svg title="copy to clipboard" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 " fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
          </p>
          <p>${d.fromValue}</p>
          <p>distance: ${d.distance.toFixed(0)}</p>
        </div>
        `,
    )
}
