import { Admin, Resource } from 'react-admin'
import { listCategory, editCategory, createCategory } from './enterprise/src/components/QandA/QAManager/Category.js'
import { listUsers, editUsers, createUsers } from './enterprise/src/components/QandA/QAManager/Users'


function indexQA() {
  return (
    <div className='App'>
      <Admin


      >
        <Resource
          name='Category'
          list={listCategory}
          edit={editCategory}
          create={createCategory}
        />
        <Resource
          name='users'
          list={listUsers}
          edit={editUsers}
          create={createUsers}
        />
      </Admin>
    </div>
  )
}

export default indexQA