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

function getRatesBoard () {
   ApiConnector.getStocks((response) => {
      if (response.success === true){ 
         ratesBoard.clearTable();
         ratesBoard.fillTable(response.data);
      }; 
   })
}

function decorator () {
   getRatesBoard ()
   setInterval(() => {
         getRatesBoard ();
   }, 60000);
}      
   
decorator ()



// setInterval(function getRatesBoard () {
//    ApiConnector.getStocks((response) => {
//       if (response.success === true){ 
//          ratesBoard.clearTable();
//          ratesBoard.fillTable(response.data);
//       }; 
//    })
// }, 1000);

const moneyManager = new MoneyManager;

moneyManager.addMoneyCallback = (data) => {
   ApiConnector.addMoney(data, (response) => {
      if (response.success === true){ 
         ProfileWidget.showProfile(response.data);
         moneyManager.setMessage(true, "Баланс пополнен");
      } else {
         moneyManager.setMessage(false, response.error);
      };
   }); 
};

moneyManager.conversionMoneyCallback = (data) => {
   ApiConnector.convertMoney(data, (response) => {
      if (response.success === true){ 
         ProfileWidget.showProfile(response.data);
         moneyManager.setMessage(true, "Введенная сумма конвертированна");
      } else {
         moneyManager.setMessage(false, response.error);
      }
   }); 
};

moneyManager.sendMoneyCallback = (data) => {
   ApiConnector.transferMoney(data, (response) => {
      if (response.success === true){ 
         ProfileWidget.showProfile(response.data);
         moneyManager.setMessage(true, "Перевод средств успешно проведен");
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
         favoritesWidget.setMessage(true, "Пользователь добавлен");
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
         favoritesWidget.setMessage(true, "выбранный пользователь удален");
      } else {
         favoritesWidget.setMessage(false, response.error);
      }
   })
}