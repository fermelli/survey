// SNACKBAR
Vue.component("snackbar-component", {
  props: {
    text: {
      type: String,
      required: true
    },
    showSnackbar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: true
    };
  },
  methods: {
    animationEnd() {
      this.show = false;
      if (event.animationName === "snackbar-out") {
        this.$emit("hide-snackbar");
      }
    }
  },
  template: "#snackbar-component"
});
// INPUT-RADIO
Vue.component("input-radio", {
  model: {
    prop: "checked",
    event: "change"
  },
  props: {
    id: {
      type: String,
      required: true
    },
    column: {
      type: Object,
      required: true
    },
    row: {
      type: Object,
      required: true
    }
  },
  template: "#input-radio"
});

// SURVEY-PAGE
Vue.component("survey-page", {
  props: {
    page: {
      type: Object
    },
    pageNumber: {
      type: Number
    },
    activePage: {
      type: Number,
      default: 1
    },
    numberOfPages: {
      type: Number,
      required: true
    }
  },
  created() {
    this.model[this.page.name] = {};
    this.page.rows.map(row => {
      this.model[this.page.name][row.value] = null;
    });
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    emitNextPage() {
      let modelPage = this.model[this.page.name];
      let flag = Object.keys(modelPage).find(key => {
        return modelPage[key] === null;
      });
      if (!flag) {
        this.$emit("next-page");
      } else {
        this.$emit("show-snackbar");
      }
    }
  },
  template: "#survey-page"
});

// MODAL-COMPONENT
Vue.component("modal-component", {
  props: {
    title: {
      type: String
    },
    isOpen: {
      type: Boolean,
      required: true,
      default: false
    },
    showSnackbar: {
      type: Boolean
    }
  },
  template: "#modal-component",
  data() {
    return {
      out: false
    };
  },
  methods: {
    close() {
      this.out = true;
    },
    emitClose() {
      if (event.animationName === "out") {
        this.$emit("close-modal");
        this.out = false;
      }
    }
  }
});
// VUE
let app = new Vue({
  el: "#app",
  data: {
    isOpen: true,
    activePage: 1,
    showSnackbar: false,
    pages: [
      {
        id: 1,
        name: "are01",
        description:
          "Domina los principios, fundamentos y conceptos de la disciplina que imparte en el curso.",
        title: "Dominio de la asignatura.",
        columns: [
          { value: 1, text: "Deficiente" },
          { value: 2, text: "Regular" },
          { value: 3, text: "Bueno" },
          { value: 4, text: "Muy bueno" },
          { value: 5, text: "Excelente" }
        ],
        rows: [
          {
            value: "q1",
            text: "Explica de manera clara los contenidos de la asignatura."
          },
          {
            value: "q2",
            text:
              "Relaciona los contenidos de la asignatura con los contenidos de otras."
          },
          {
            value: "q3",
            text:
              "Resuelve las dudas relacionadas con los contenidos de la asignatura."
          }
        ]
      },
      {
        id: 2,
        name: "are02",
        description:
          "Planifica con precisión y detalle el proceso de aprendizaje, con base en la naturaleza de los contenidos, las características de los students y el perfil del curso y de la carrera.",
        title: "Planificación del curso.",
        columns: [
          { value: 1, text: "Deficiente" },
          { value: 2, text: "Regular" },
          { value: 3, text: "Bueno" },
          { value: 4, text: "Muy bueno" },
          { value: 5, text: "Excelente" }
        ],
        rows: [
          {
            value: "q4",
            text:
              "Cumple con los acuerdos establecidos al inicio de la asignatura."
          },
          {
            value: "q5",
            text:
              "Durante el curso establece las estrategias adecuadas necesarias para lograr el aprendizaje deseado."
          }
        ]
      },
      {
        id: 3,
        name: "are03",
        description:
          "Crea ambientes, espacios y climas donde los estudiantes aprenden con eficacia y gusto.",
        title: "Ambientes de aprendizaje",
        columns: [
          { value: 1, text: "Deficiente" },
          { value: 2, text: "Regular" },
          { value: 3, text: "Bueno" },
          { value: 4, text: "Muy bueno" },
          { value: 5, text: "Excelente" }
        ],
        rows: [
          {
            value: "q6",
            text:
              "Incluye experiencias de aprendizaje en lugares diferentes al aula (talleres, laboratorios, empresa, comunidad, etc.)."
          },
          {
            value: "q7",
            text:
              "Utiliza para el aprendizaje las herramientas de interacción de las tecnologías actuales de la información (correo electrónico, chats, plataformas, etc.)."
          },
          {
            value: "q8",
            text:
              "Organiza actividades que me permiten ejercitar mi expresión oral y escrita."
          }
        ]
      }
    ]
  },
  methods: {
    openModal() {
      this.isOpen = true;
    },
    closeModal() {
      this.isOpen = false;
    }
  }
});
