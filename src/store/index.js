import Vuex from 'vuex'

const storeData = {
  state: {
    isDisable: false,
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
    firstForm: (state) => state.info.firstForm,
    companyList: (state) => state.info.companyList,
    thirdForm: (state) => state.info.thirdForm,
    info: (state) => state.info,
  },
}

const store = new Vuex.Store(storeData)

export default store
