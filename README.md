# Lipa
Lipa calculates the amount each person owes when splitting a receipt.

## Deployment
Run `npm i` the first time to install dependencies.

Run `npm start` to serve the built application.

Alternatively, run `ng serve` to run the app directly in development mode.

## Usage
The Main page consists of 2 tabs - 'Items' and 'People'. The first tab asks for the list of items on the receipt, and the second tab asks for the list of people, and the item distribution.

### Items tab
- Fill in the Item name, cost, quantity, and taxable status of the first item on your receipt.
- Click '+ Add Item' to add the second item, and repeat as above, until all items are listed.
- The trashcan icon is used to delete the item.
    
### People tab
- Fill in the first person's name.
- Check the boxes for each item the person was involved in buying.
- Click '+ Add Person' to add the second person, and repeat as above, until all people are listed.
- The trashcan icon is used to delete the person.

### Calculate and save
- Once both tabs are filled and valid, you can click the Calculate button to view results.
- Results can be saved as an image.
- You can also copy a link to view the results directly on Lipa, but this is not recommended as the link can be quite long and may be cut off by other Apps, making the link useless in those cases. 