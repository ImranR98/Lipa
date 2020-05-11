# Lipa
Lipa calculates the amount each person owes when splitting a reciept.

## Deployment
Run `npm i` the first time to install dependencies.

Run `npm start` to serve the built application.

Alternatively, run `ng serve` to run the app directly in development mode.

## Usage
The Main page consists of 2 tabs - 'Items' and 'People'. The first tab asks for the list of items on the reciept, and the second tab asks for the list of people, and the item distribution.

### Items tab
- Fill in the Item name, cost, quantity, and taxable status of the first item on your reciept.
- Click '+ Add Item' to add the second item, and repeat as above, until all items are listed.
- The trashcan icon is used to delete the item.
    
### People tab
- Fill in the first person's name.
- Check the boxes for each item the person was involved in buying.
- Click '+ Add Person' to add the second person, and repeat as above, until all people are listed.
- The trashcan icon is used to delete the person.

## TODOs
`
Todo:
Snackbar is white in dark mode?
Show prompt before leaving the main component, if it has any valid data (in either items or people forms)
`