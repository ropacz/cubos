/**
 * Gera um código aleatório para a url
 */
const gerarCodigo = () => Math.random().toString(36).substr(2, 9);

module.exports = gerarCodigo;
