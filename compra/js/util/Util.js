export const monetarioBr = num => {
    return num.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
}

export const dataBr = data => {
    return data.split("-").reverse().join("/")
}