'use strict'

const logoutButton = new LogoutButton;
logoutButton.action = () => {
   ApiConnector.logout ((response) => {
   if (response.success === true){ 
      location.reload();
      };
   });
}

ApiConnector.current ((response) => {
   if (response.success === true){ 
      ProfileWidget.showProfile(response.data);
   };
});

const ratesBoard = new RatesBoard;

setInterval(function getRatesBoard () {
   ApiConnector.getStocks((response) => {
      if (response.success === true){ 
         ratesBoard.clearTable();
         ratesBoard.fillTable(response.data);
      }; 
   })
}, 1000);

const moneyManager = new MoneyManager;

moneyManager.addMoneyCallback = (data) => {
   ApiConnector.addMoney(data, (response) => {
      if (response.success === true){ 
         ProfileWidget.showProfile(response.data);
         moneyManager.setMessage(true, response.success);
      } else {
         moneyManager.setMessage(false, response.error);
      };
   }); 
};

moneyManager.conversionMoneyCallback = (data) => {
   ApiConnector.convertMoney(data, (response) => {
      if (response.success === true){ 
         ProfileWidget.showProfile(response.data);
         moneyManager.setMessage(true, response.success);
      } else {
         moneyManager.setMessage(false, response.error);
      }
   }); 
};

moneyManager.sendMoneyCallback = (data) => {
   ApiConnector.transferMoney(data, (response) => {
      if (response.success === true){ 
         ProfileWidget.showProfile(response.data);
         moneyManager.setMessage(true, response.success);
      } else {
         moneyManager.setMessage(false, response.error);
      }
   }); 
};

const favoritesWidget = new FavoritesWidget;

ApiConnector.getFavorites((response) => {
   if (response.success === true){ 
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      moneyManager.updateUsersList(response.data);
   };
});

favoritesWidget.addUserCallback = (data) => {
   ApiConnector.addUserToFavorites(data, (response) => {
      if (response.success === true){ 
         favoritesWidget.clearTable();
         favoritesWidget.fillTable(response.data);
         moneyManager.updateUsersList(response.data);
         favoritesWidget.setMessage(true, response.success);
      } else {
         favoritesWidget.setMessage(false, response.error);
      }
   })
}

favoritesWidget.removeUserCallback = (data) => {
   ApiConnector.removeUserFromFavorites(data, (response) => {
      if (response.success === true){ 
         favoritesWidget.clearTable();
         favoritesWidget.fillTable(response.data);
         moneyManager.updateUsersList(response.data);
         favoritesWidget.setMessage(true, response.success);
      } else {
         favoritesWidget.setMessage(false, response.error);
      }
   })
}