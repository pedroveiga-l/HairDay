import {schedulesDay} from "./load.js"
import {scheduleCancel} from "../../services/schedule-cancel.js"
const periods = document.querySelectorAll('.period')

// Gera evento click para cada lista (manhã, tarde, noite)
periods.forEach((period) => {
    // Captura o evento click
    period.addEventListener("click", async (event) => {
        if(event.target.classList.contains("cancel-icon")) {
            // Obtem a li do pai do elemento clicado
            const item = event.target.closest("li")

            // Pega o id do agendamento para remover
            const {id} = item.dataset

            // Confirma o id selecionado
            if (id) {
            // confirma se o usuário deseja cancelar o agendamento
            const isConfirm = confirm("Deseja cancelar esse agendamento?")

            if (isConfirm) {
                // Faz a requisição na API para cancelar o agendamento
                await scheduleCancel({id})

                // Recarrega os agendamento do dia para atualizar a tela
                schedulesDay()
            }
        }
        }
    })
})