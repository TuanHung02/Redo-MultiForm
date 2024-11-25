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
}

const store = new Vuex.Store(storeData)

export default store
