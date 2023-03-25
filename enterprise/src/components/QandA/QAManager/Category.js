import {
    List,
    Datagrid,
    TextField,
    Edit,
    SimpleForm,
    EditButton,
    Create,
    TextInput,
  } from 'react-admin'
  
  export const listCategory = (props) => (
    <List {...props}>
      <Datagrid>
        <TextField source='Type' />
        <TextField source='Begin date' />
        <TextField source='Finish datee' />
  
        <EditButton basePath='/Category' />
      </Datagrid>
    </List>
  )
  
  export const editCategory = (props) => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source='Type' />
        <TextInput source='Begin date' />
        <TextInput source='Finish date' />
      </SimpleForm>
    </Edit>
  )
  
  export const createCategory = (props) => (
    <Create {...props}>
      <SimpleForm>
        <TextInput source='Type' />
        <TextInput source='Begin date' />
        <TextInput source='Finish date' />
      </SimpleForm>
    </Create>
  )