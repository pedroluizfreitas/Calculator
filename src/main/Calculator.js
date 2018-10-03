import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    // operation: Vai armazenar todas as operações
    operation: null,
    // values: Array com dois valores. Por exemplo: 80(1)+20(2) = 100(1) + 10(2) = 110
    values: [0, 0],
    // current: Parâmetro que determina se estamos trabalhando com o valor de indice 1 desse array ou valor de índice 2
    current: 0,
}

export default class Calculator extends Component {

    // Constructor(props) {
    //     super(props)
    //     this.clearMemory = this.clearMemory.bind(this)
    //     this.setOperation = this.setOperation.bind(this)
    //     this.addDigit = this.addDigit.bind(this)
    // }

    // Se fizermos da forma mencionada acima, com o bind podemos tirar as arrows functions
    // que foram feitas abaixo. Não podemos deixar de colocar na função click={this.FUNCTIONNAME}

    state = { ...initialState }

    clearMemory() {
        // console.log("Limpar")
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        // console.log(operation)
        if (this.state.current === 0) {
            // Vamos mudar o current de 0 para 1
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation
            const values = { ...this.state.values }

            try {
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
            } catch (e) {
                values[0] = this.state.values[0]
            }

            values[1] = 0
            this.setState({
                // displayValue vai receber os valores índice zero.
                displayValue: values[0],
                // Se for um sinal de '=' a operação será nula.
                operation: equals ? null : operation,
                // Qual o valor corrent que eu estou mexendo.
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                // Chamando por último os valores
                values
            })
        }
    }

    addDigit(n) {

        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }
        // Vamos ter dois cenários: 
        // 1º: Quando o display contem apenas o digito zero, e eu preciso limpar o display para adicionar um novo digito. Ou seja, não ficar um zero a esquerda.
        // 2º: Ou vou limpar quando a variável 'clearDisplay' estiver 'true'

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        // A variável 'currentValue' vai depender se o display vai ser limpo ou não!
        // Se o clearDisplay for "true", o valor corrente vai ser vazio. Se o display nao for limpo, vou pegar o 'displayValue'
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        // Passamos o 'displayValue' que é o próprio display. 'clearDisplay' pra falso porquê referencia a variável criada acima. 
        this.setState({ displayValue, clearDisplay: false })

        // Sempre que for digitado um valor diferente de '.'. Eu quero armazenar esse número que foi digitado
        // no array 'values:[0 , 0]'. Só que value; [0, 0] não é uma string e o 'displayValue' é uma string.
        // Eu quero seja número para ser armazenado.

        if (n !== '.') {

            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = { ...this.state.values }
            values[i] = newValue
            // Com o setState substituimos o novo array.
            this.setState({ values })
            console.log(values)
        }
    }

    render() {

        const addDigit = n => this.addDigit(n)
        const setOperation = operation => this.setOperation(operation)

        return (
            <div className="calculator">
                <Display value={this.state.displayValue} />
                <Button label="AC" click={() => this.clearMemory()} triple />
                <Button label="/" click={setOperation} operation />
                <Button label="7" click={addDigit} />
                <Button label="8" click={addDigit} />
                <Button label="9" click={addDigit} />
                <Button label="*" click={setOperation} operation />
                <Button label="4" click={addDigit} />
                <Button label="5" click={addDigit} />
                <Button label="6" click={addDigit} />
                <Button label="-" click={setOperation} operation />
                <Button label="1" click={addDigit} />
                <Button label="2" click={addDigit} />
                <Button label="3" click={addDigit} />
                <Button label="+" click={setOperation} operation />
                <Button label="0" click={addDigit} double />
                <Button label="." click={addDigit} />
                <Button label="=" click={setOperation} />
            </div>
        )
    }
}
