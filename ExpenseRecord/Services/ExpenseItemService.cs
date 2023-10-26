using ExpenseRecord.Models;
using System.Runtime.InteropServices;

namespace ExpenseRecord.Services
{
    public class ExpenseItemService : IExpenseItemService
    {
        private static readonly List<ExpenseItemDto> _exItems = new();

        public void Create(ExpenseItemDto item)
        {
            _exItems.Add(item);
        }

        public List<ExpenseItemDto> GetItems() {  return _exItems; }

        public ExpenseItemDto GetItem(string id)
        {
            var exItem = _exItems.Find(x => x.Id == id);
            return exItem;
        }

        public bool DeleteItem(string id)
        {
            var itemToBeDeleted = _exItems.Find(x => x.Id == id);
            if (itemToBeDeleted != null)
            {
                _exItems.Remove(itemToBeDeleted);
                return true;
            }
            return false;
        }
    }
}
