const currentOutput = document.querySelector('.current-operand')
const previousOutput = document.querySelector('.previous-operand')
const numberBtns = document.querySelectorAll('[data-type="number"]')
const acBtn = document.querySelector('[data-type="ac"]')
const delBtn = document.querySelector('[data-type="del"]')
const equalsBtn = document.querySelector('[data-type="equals"]')
const operationBtns = document.querySelectorAll('[data-type="operation"]')

class Calculator {
  constructor(currentOutputText, previousOutputText) {
    this.currentOutputText = currentOutputText
    this.previousOutputText = previousOutputText
    this.clear()
  }

  clear() {
    this.currentOutput = ''
    this.previousOutput = ''
    this.operation = undefined
  }

  delete() {
    this.currentOutput = this.currentOutput.slice(0, -1)
  }

  appendNumber(number) {
    if (number === ',' && this.currentOutput.includes(',')) return
    this.currentOutput = this.currentOutput + number
  }

  chooseOperation(operation) {
    if (this.currentOutput === '') return
    if (this.previousOutput !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOutput = this.currentOutput
    this.currentOutput = ''
  }

  displayOnScreen() {
    this.currentOutputText.textContent = this.currentOutput
    this.previousOutputText.textContent = this.previousOutput
    console.log(this.operation);
    if (this.operation !== undefined) {
      this.previousOutputText.textContent = `${this.previousOutput} ${this.operation}`
    }
  }

  compute() {
    let result
    let currValue = parseFloat(this.currentOutput)
    let prevValue = parseFloat(this.previousOutput)
    
    if (isNaN(prevValue) || isNaN(currValue)) return

    switch (this.operation) {
      case '+':
        result = currValue + prevValue
        break
      case '-':
        result = prevValue - currValue 
        break
      case '÷':
        result = prevValue / currValue
        break
      case '*':
        result = currValue * prevValue
        break
      default:
        return
    }
    this.currentOutput = result
    this.operation = undefined
    this.previousOutput = ''
  }
}  
const calculator = new Calculator(currentOutput, previousOutput)

numberBtns.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.textContent)
    calculator.displayOnScreen()
  })
})



operationBtns.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.textContent)
    calculator.displayOnScreen()
  })
})

equalsBtn.addEventListener('click', () => {
  calculator.compute()
  calculator.displayOnScreen()
})

acBtn.addEventListener('click', () => {
  calculator.clear()
  calculator.displayOnScreen()
})

delBtn.addEventListener('click', () => {
  calculator.delete()
  calculator.displayOnScreen()
})