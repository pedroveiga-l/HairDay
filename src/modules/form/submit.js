import dayjs from "dayjs"

import {scheduleNew} from "../../services/schedule-new.js"

const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")

// Date atual para o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// Carrega a data atual e Define a data mínima como a data atual
selectedDate.value = inputToday
selectedDate.min =  inputToday

form.onsubmit = async (event) => {
    // Previne o comportamento padrão de carregamento da página
    event.preventDefault();

    try {
        // Recuperando o nome do cliente
        const name = clientName.value.trim()

        if(!name) {
            return alert("Por favor, insira o nome do cliente.")
        }

        // Recupera o horário selecionado
        const hourSelected = document.querySelector(".hour-selected")

        if(!hourSelected) {
            return alert("Por favor, selecione um horário.")
        }

        // Recupera somente a hora
        const [hour] = hourSelected.innerText.split(":")

        // Insere a hora na data
        const when = dayjs(selectedDate.value).add(hour, "hour")

        // Gera um ID
        const id = new Date().getTime()

        await scheduleNew({
            id,
            name,
            when,
        })
    } catch (error) {
        alert("Não foi possível realizar o agendamento.")
        console.log(error)
    }
}