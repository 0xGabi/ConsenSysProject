# Design Pattern Decisions

1. MarketPlace implemented with a Factory design pattern. This will ensure that every Store deployed using the factory adheres to a certain standard. Allowing for extensibility and easily manageable. 

2. OpenZeppelins-solidity SafeMath library implemented as a base type for uint256 to cover from overflow.
https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/math/SafeMath.sol  

3. OpenZeppelins-solidity Pausable contract implimented as an circuit breaker pattern. 
https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/contracts/lifecycle/Pausable.sol  

4. Implement modifiers to control access of functions that modify state.

5. Functional Testing over solidity testing, to cover more test cases and limit conditions.

6. Use of the patter Fail early and fail loud to check conditions as early as possible.

7. Decide not to use Mortal design pattern cause my app will only live on private chain on this iteration.

8. State Machine was not usefull pattern for my application in this iteration. 