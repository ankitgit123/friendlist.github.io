import {
  MdOutlineFavoriteBorder,
  MdOutlineFavorite,
  MdDelete,
} from "react-icons/md";

function Friends({
  friends,
  removeFriends,
  searchText,
  setFilteredResults,
  setFriends,
}) {

  const toggleFavorites = async(id) => {
     friends.forEach((friend) => {if(friend.id === id){
        friend.isSelected=!friend.isSelected;
    }});
    const markedFavorite = friends.filter((friend) => friend.isSelected);
    const remaining = friends.filter(
      (friend) => !markedFavorite.includes(friend)
    );
    
        if (searchText !== "") {
            setFilteredResults([...markedFavorite, ...remaining]);
          } else {
            setFriends([...markedFavorite, ...remaining]);
          }      
    
  };

  return friends.map((friend, index) => (
    <div className="list-items" key={index}>
      <span key={friend.id}>{friend.name}</span>
      <div className="äctions">
      
        <div className="btn-action" onClick={() => toggleFavorites(friend.id)} key={friend.id}>
          {friend.isSelected ? <MdOutlineFavorite /> : <MdOutlineFavoriteBorder />}
        </div>
      
      <button className="btn-action ml-5px" onClick={() => removeFriends(friend.id)}>
        <MdDelete />
      </button>
      </div>
    </div>
  ));
}

export default Friends;
