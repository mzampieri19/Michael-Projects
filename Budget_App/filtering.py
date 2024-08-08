import pandas as pd
import os


def main():
    print('test')
    #Combine all dataframes into one dataframe
    df = pd.concat([filterCapitalOne(file1), filterAMEX(file2), filterAppleCard(file3)], ignore_index=True)
    #Save the new dataframe to a csv file
    df.to_csv('all_transactions.csv', index=False)

file1 = 'combined_CapitalOne.csv'
def filterCapitalOne(file1):
    df = pd.read_csv(file1)
    #Remove posted date, and card number collumns.
    df = df.drop(columns=['Posted Date', 'Card No.'])
    #If a transaction is credit, change the credit collumn to negative
    df.loc[df['Credit'].notnull(), 'Credit'] = df['Credit'] * -1
    #Combine the debit and credit collumns into one collumn called 'Amount'
    df['Amount'] = df['Debit'].fillna(df['Credit'])
    df = df.drop(columns=['Debit', 'Credit'])
    print('Filtered Capital One transactions saved to all_transactions.csv')
    #Make the function return the new dataframe as df1 that will later be added into the large csv file
    return df

file2 = 'combined_AMEX.csv'
def filterAMEX(file2):
    df = pd.read_csv(file2)
    #Remove posted date, and card number collumns.
    df = df.drop(columns=['Extended Details', 'Appears On Your Statement As', 'Reference', 'Address', 'City/State', 'Zip Code', 'Country'])
    #If the desciption is "MOBILE PAYMENT - THANK YOU", change it to "MOBILE PAYMENT"
    df.loc[df['Description'] == 'MOBILE PAYMENT - THANK YOU', 'Description'] = 'MOBILE PAYMENT'
    #If the description has a lot of empty spaces remove the spaces and anything after the spaces
    df['Description'] = df['Description'].str.replace(' +', ' ')
    #In the category collumn remove everything after the "-" and remove any empty spaces
    df['Category'] = df['Category'].str.replace(' -.*', '')
    print('Filtered AMEX transactions saved to all_transactions.csv')
    #Make the function return the new dataframe as df1 that will later be added into the large csv file
    return df

file3 = 'combined_AppleCard.csv'
def filterAppleCard(file3):
    df = pd.read_csv(file3)
    #Remove posted date, and card number collumns.
    df = df.drop(columns=['Clearing Date', 'Type', 'Purchased By', "Description"])
    #Change the merchnat collumn to Descirption
    df = df.rename(columns={"Merchant": "Description"})
    print('Filtered Apple Card transactions saved to all_transactions.csv')
    #Make the function return the new dataframe as df1 that will later be added into the large csv file
    return df


if __name__ == "__main__":
    main()