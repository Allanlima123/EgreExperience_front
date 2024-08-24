import { defineStore } from "pinia";

export const useEstudanteStore = defineStore("Estudante", {
  state: () => ({
    anoFormacao: "",
    foto: "",
    nome: "",
    cargoAtual: "",
    descricaoTecnica: "",
    idiomas: [],
    habilidades: [],
    perfilId: 0,
  }),
  
  actions: {
    setAnoFormacao(ano) {
      this.anoFormacao = ano;
    },
    setFoto(foto) {
      this.foto = foto;
    },
    setNome(nome) {
      this.nome = nome;
    },
    setCargoAtual(cargo) {
      this.cargoAtual = cargo;
    },
    setDescricaoTecnica(descricao) {
      this.descricaoTecnica = descricao;
    },
    setIdiomas(idiomas) {
      this.idiomas = idiomas;
    },
    setHabilidades(habilidades) {
      this.habilidades = habilidades;
    },
    setPerfilId(id) {
      this.perfilId = id;
    },
    resetState() {
      this.$reset();
    },
  },
  getters: {
    isCompleteProfile(state) {
      return (
        state.nome !== "" &&
        state.cargoAtual !== "" &&
        state.descricaoTecnica !== ""
      );
    },
    totalHabilidades(state) {
      return state.habilidades.length;
    },
  },
});
