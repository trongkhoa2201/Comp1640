import { Admin, Resource } from 'react-admin'
import { listCategory, editCategory, createCategory } from './enterprise/src/components/QAManager/Category.js'
import { listUsers, editUsers, createUsers } from './enterprise/src/components/QAManager/Users'


function indexQA() {
  return (
    <div className='indexQA'>
      <Admin


      >
        <Resource
          name='Category'
          list={listCategory}
          edit={editCategory}
          create={createCategory}
        />
        <Resource
          name='Users'
          list={listUsers}
          edit={editUsers}
          create={createUsers}
        />
      </Admin>
    </div>
  )
}

export default indexQA