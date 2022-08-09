import './styles/tailwind.css'
import { select, color } from 'd3'
import pkg from 'tailwindcss/package.json'

// console.log(pkg.version)

select('#tailwind-version').text(pkg.version)
// import colors from 'tailwindcss/colors'

// console.log(colors);

// const ignoreColors = ['inherit', 'current', 'transparent']

const defaultColor = '#000000'

const colorInputText = select('#color-input-text').attr('value', defaultColor)
const colorInput = select('#color-input').attr('value', defaultColor)
const showColor = select('#show-color')
const colorError = select('#color-error')
const showHex = select('#show-hex')
const showRgb = select('#show-rgb')

colorInput.on('change input', e => {
  // console.log(e.target.value)
  colorInputText.property('value', e.target.value)
  showColor.style('background-color', e.target.value)

  showHex.text(color(e.target.value).formatHex())
  showRgb.text(color(e.target.value).formatRgb())
})

colorInputText.on('change input', e => {
  // console.log(e.target.value)
  const parsedColor = color(e.target.value)
  console.log(parsedColor)
  if (parsedColor) {
    colorInput.property('value', parsedColor.formatHex())
    showColor.style('background-color', parsedColor.formatHex())
    colorError.text('')
  } else {
    colorError.text('Invalid color')
  }
  // console.log(parsedColor)
})
