# Design Pattern Decisions

1. MarketPlace implemented with a Factory design pattern. This will ensure that every Store deployed using the factory adheres to a certain standard. Allowing for extensibility and easily manageable. 

2. OpenZeppelins-solidity SafeMath library implemented as a base type for uint256 to cover from overflow.
https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/math/SafeMath.sol  

3. OpenZeppelins-solidity Pausable contract implimented as an circuit breaker pattern.  
https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/lifecycle/Pausable.sol  

4. OpenZeppelins-solidity Ownable contract implemented to use as modifier to only allow the owner in some functions.
https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/ownership/Ownable.sol

5. OpenZeppelins-solidity Escrow contract implemented to manage the payments on the store as a deposit for the store owner.
https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/payment/Escrow.sol

6. Functional Testing over solidity testing, to cover more edge cases.  