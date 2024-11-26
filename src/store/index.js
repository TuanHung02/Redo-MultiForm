import Vuex from 'vuex'

const storeData = {
  state: {
    isDisable: true,
    info: {
      firstForm: {
        fullName: '',
        date: '',
        city: '',
        description: '',
      },
      companyList: [
        {
          id: 1,
          company: '',
          position: '',
          start_date: '',
          end_date: '',
          description: '',
        },
      ],
      thirdForm: {
        description: '',
        salary: '',
      },
    },
  },
  getters: {
    isDisable: (state) => state.isDisable,
    firstForm: (state) => state.info.firstForm,
    companyList: (state) => state.info.companyList,
    thirdForm: (state) => state.info.thirdForm,
  },
  mutations: {
    setFirstForm(state, firstForm) {
      state.info.firstForm = firstForm
    },
    setSecondForm(state, companyList) {
      state.info.companyList = companyList
    },
    setThirdForm(state, thirdForm) {
      state.info.thirdForm = thirdForm
    },
    setDisable(state, disable) {
      state.isDisable = disable
    },
  },
}

const store = new Vuex.Store(storeData)

export default store
