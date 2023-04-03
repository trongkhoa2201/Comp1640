import {
    List,
    Datagrid,
    TextField,
    Edit,
    SimpleForm,
    EditButton,
    TextInput,
    Create,
    EmailField,
  } from 'react-admin'
  
  export const listUsers = (props) => (
    <List {...props}>
      <Datagrid>
        <TextField source='Name' />
        <TextField source='Password' />
        <EmailField source='Email' />
        <TextField source='Role' />
  
        <EditButton basePath='/Users' />
      </Datagrid>
    </List>
  )
  
  export const editUsers = (props) => (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source='Name' />
        <TextInput source='Password' />
        <TextInput source='Email' />
        <TextInput source='Role' />
      </SimpleForm>
    </Edit>
  )
  
  export const createUsers = (props) => (
    <Create {...props}>
      <SimpleForm>
        <TextInput source='Name' />
        <TextInput source='Password' />
        <TextInput source='Email' />
        <TextInput source='Role' />
      </SimpleForm>
    </Create>
  )