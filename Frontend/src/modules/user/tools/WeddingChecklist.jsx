import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import Icon from '../../../components/ui/Icon';

const WeddingChecklist = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [showAllTasks, setShowAllTasks] = useState(false);

  // All 71 wedding tasks organized by category
  const allTasks = [
    // Venue & Catering (12 tasks)
    { id: 1, category: 'Venue & Catering', task: 'Research Wedding Planners', dueDate: '12 months before', color: '#ec4899' },
    { id: 2, category: 'Venue & Catering', task: 'Decide wedding budget', dueDate: '12 months before', color: '#ec4899' },
    { id: 3, category: 'Venue & Catering', task: 'Book wedding venue', dueDate: '10 months before', color: '#ec4899' },
    { id: 4, category: 'Venue & Catering', task: 'Finalize guest list', dueDate: '10 months before', color: '#ec4899' },
    { id: 5, category: 'Venue & Catering', task: 'Book caterer', dueDate: '8 months before', color: '#ec4899' },
    { id: 6, category: 'Venue & Catering', task: 'Arrange food tasting', dueDate: '6 months before', color: '#ec4899' },
    { id: 7, category: 'Venue & Catering', task: 'Finalize menu', dueDate: '4 months before', color: '#ec4899' },
    { id: 8, category: 'Venue & Catering', task: 'Arrange bar services', dueDate: '4 months before', color: '#ec4899' },
    { id: 9, category: 'Venue & Catering', task: 'Book wedding cake', dueDate: '3 months before', color: '#ec4899' },
    { id: 10, category: 'Venue & Catering', task: 'Confirm venue layout', dueDate: '2 months before', color: '#ec4899' },
    { id: 11, category: 'Venue & Catering', task: 'Arrange seating plan', dueDate: '1 month before', color: '#ec4899' },
    { id: 12, category: 'Venue & Catering', task: 'Final venue walkthrough', dueDate: '1 week before', color: '#ec4899' },

    // Photography & Videography (10 tasks)
    { id: 13, category: 'Photography & Videography', task: 'Research photographers', dueDate: '10 months before', color: '#f59e0b' },
    { id: 14, category: 'Photography & Videography', task: 'Book photographer', dueDate: '9 months before', color: '#f59e0b' },
    { id: 15, category: 'Photography & Videography', task: 'Book videographer', dueDate: '9 months before', color: '#f59e0b' },
    { id: 16, category: 'Photography & Videography', task: 'Schedule engagement shoot', dueDate: '6 months before', color: '#f59e0b' },
    { id: 17, category: 'Photography & Videography', task: 'Create shot list', dueDate: '3 months before', color: '#f59e0b' },
    { id: 18, category: 'Photography & Videography', task: 'Share venue details with photographer', dueDate: '2 months before', color: '#f59e0b' },
    { id: 19, category: 'Photography & Videography', task: 'Arrange pre-wedding shoot', dueDate: '2 months before', color: '#f59e0b' },
    { id: 20, category: 'Photography & Videography', task: 'Confirm photography timeline', dueDate: '1 month before', color: '#f59e0b' },
    { id: 21, category: 'Photography & Videography', task: 'Share family photo list', dueDate: '2 weeks before', color: '#f59e0b' },
    { id: 22, category: 'Photography & Videography', task: 'Final meeting with photographer', dueDate: '1 week before', color: '#f59e0b' },

    // Attire & Beauty (12 tasks)
    { id: 23, category: 'Attire & Beauty', task: 'Shop for bridal lehenga', dueDate: '8 months before', color: '#10b981' },
    { id: 24, category: 'Attire & Beauty', task: 'Shop for groom sherwani', dueDate: '8 months before', color: '#10b981' },
    { id: 25, category: 'Attire & Beauty', task: 'Book bridal makeup artist', dueDate: '6 months before', color: '#10b981' },
    { id: 26, category: 'Attire & Beauty', task: 'Book mehndi artist', dueDate: '6 months before', color: '#10b981' },
    { id: 27, category: 'Attire & Beauty', task: 'Purchase bridal jewelry', dueDate: '5 months before', color: '#10b981' },
    { id: 28, category: 'Attire & Beauty', task: 'Buy bridal accessories', dueDate: '4 months before', color: '#10b981' },
    { id: 29, category: 'Attire & Beauty', task: 'Schedule makeup trial', dueDate: '3 months before', color: '#10b981' },
    { id: 30, category: 'Attire & Beauty', task: 'Finalize bridal look', dueDate: '2 months before', color: '#10b981' },
    { id: 31, category: 'Attire & Beauty', task: 'Get outfit alterations done', dueDate: '1 month before', color: '#10b981' },
    { id: 32, category: 'Attire & Beauty', task: 'Buy bridal footwear', dueDate: '1 month before', color: '#10b981' },
    { id: 33, category: 'Attire & Beauty', task: 'Schedule hair trial', dueDate: '2 weeks before', color: '#10b981' },
    { id: 34, category: 'Attire & Beauty', task: 'Final fitting for outfits', dueDate: '1 week before', color: '#10b981' },

    // Invitations & Stationery (8 tasks)
    { id: 35, category: 'Invitations & Stationery', task: 'Design save the dates', dueDate: '8 months before', color: '#8b5cf6' },
    { id: 36, category: 'Invitations & Stationery', task: 'Send save the dates', dueDate: '6 months before', color: '#8b5cf6' },
    { id: 37, category: 'Invitations & Stationery', task: 'Design wedding invitations', dueDate: '5 months before', color: '#8b5cf6' },
    { id: 38, category: 'Invitations & Stationery', task: 'Order wedding invitations', dueDate: '4 months before', color: '#8b5cf6' },
    { id: 39, category: 'Invitations & Stationery', task: 'Create e-invites', dueDate: '3 months before', color: '#8b5cf6' },
    { id: 40, category: 'Invitations & Stationery', task: 'Send wedding invitations', dueDate: '2 months before', color: '#8b5cf6' },
    { id: 41, category: 'Invitations & Stationery', task: 'Order thank you cards', dueDate: '1 month before', color: '#8b5cf6' },
    { id: 42, category: 'Invitations & Stationery', task: 'Print ceremony programs', dueDate: '2 weeks before', color: '#8b5cf6' },

    // Decorations & Flowers (10 tasks)
    { id: 43, category: 'Decorations & Flowers', task: 'Research decorators', dueDate: '8 months before', color: '#06b6d4' },
    { id: 44, category: 'Decorations & Flowers', task: 'Book decorator', dueDate: '7 months before', color: '#06b6d4' },
    { id: 45, category: 'Decorations & Flowers', task: 'Choose wedding theme', dueDate: '6 months before', color: '#06b6d4' },
    { id: 46, category: 'Decorations & Flowers', task: 'Select color palette', dueDate: '6 months before', color: '#06b6d4' },
    { id: 47, category: 'Decorations & Flowers', task: 'Book florist', dueDate: '5 months before', color: '#06b6d4' },
    { id: 48, category: 'Decorations & Flowers', task: 'Choose bridal bouquet', dueDate: '4 months before', color: '#06b6d4' },
    { id: 49, category: 'Decorations & Flowers', task: 'Finalize mandap design', dueDate: '3 months before', color: '#06b6d4' },
    { id: 50, category: 'Decorations & Flowers', task: 'Select centerpieces', dueDate: '2 months before', color: '#06b6d4' },
    { id: 51, category: 'Decorations & Flowers', task: 'Confirm decoration setup', dueDate: '1 month before', color: '#06b6d4' },
    { id: 52, category: 'Decorations & Flowers', task: 'Final decor meeting', dueDate: '1 week before', color: '#06b6d4' },

    // Entertainment & Music (8 tasks)
    { id: 53, category: 'Entertainment & Music', task: 'Book DJ or band', dueDate: '8 months before', color: '#ef4444' },
    { id: 54, category: 'Entertainment & Music', task: 'Book choreographer', dueDate: '6 months before', color: '#ef4444' },
    { id: 55, category: 'Entertainment & Music', task: 'Plan sangeet performances', dueDate: '4 months before', color: '#ef4444' },
    { id: 56, category: 'Entertainment & Music', task: 'Create wedding playlist', dueDate: '3 months before', color: '#ef4444' },
    { id: 57, category: 'Entertainment & Music', task: 'Arrange sound system', dueDate: '2 months before', color: '#ef4444' },
    { id: 58, category: 'Entertainment & Music', task: 'Book entertainment acts', dueDate: '2 months before', color: '#ef4444' },
    { id: 59, category: 'Entertainment & Music', task: 'Finalize song list', dueDate: '1 month before', color: '#ef4444' },
    { id: 60, category: 'Entertainment & Music', task: 'Confirm music timeline', dueDate: '1 week before', color: '#ef4444' },

    // Miscellaneous (11 tasks)
    { id: 61, category: 'Miscellaneous', task: 'Book wedding transportation', dueDate: '6 months before', color: '#9333ea' },
    { id: 62, category: 'Miscellaneous', task: 'Arrange guest accommodation', dueDate: '5 months before', color: '#9333ea' },
    { id: 63, category: 'Miscellaneous', task: 'Purchase wedding rings', dueDate: '4 months before', color: '#9333ea' },
    { id: 64, category: 'Miscellaneous', task: 'Apply for marriage license', dueDate: '3 months before', color: '#9333ea' },
    { id: 65, category: 'Miscellaneous', task: 'Book honeymoon', dueDate: '3 months before', color: '#9333ea' },
    { id: 66, category: 'Miscellaneous', task: 'Arrange wedding favors', dueDate: '2 months before', color: '#9333ea' },
    { id: 67, category: 'Miscellaneous', task: 'Create wedding website', dueDate: '2 months before', color: '#9333ea' },
    { id: 68, category: 'Miscellaneous', task: 'Confirm RSVP count', dueDate: '1 month before', color: '#9333ea' },
    { id: 69, category: 'Miscellaneous', task: 'Pack for honeymoon', dueDate: '1 week before', color: '#9333ea' },
    { id: 70, category: 'Miscellaneous', task: 'Prepare wedding day emergency kit', dueDate: '1 week before', color: '#9333ea' },
    { id: 71, category: 'Miscellaneous', task: 'Confirm all vendor bookings', dueDate: '3 days before', color: '#9333ea' }
  ];

  // Load tasks from localStorage on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const savedTasks = localStorage.getItem('weddingChecklistTasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      } else {
        // Initialize with all tasks unchecked
        const initialTasks = allTasks.map(task => ({ ...task, completed: false }));
        setTasks(initialTasks);
        localStorage.setItem('weddingChecklistTasks', JSON.stringify(initialTasks));
      }
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Toggle task completion
  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('weddingChecklistTasks', JSON.stringify(updatedTasks));
  };

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

  // Group tasks by category
  const categories = [
    'Venue & Catering',
    'Photography & Videography',
    'Attire & Beauty',
    'Invitations & Stationery',
    'Decorations & Flowers',
    'Entertainment & Music',
    'Miscellaneous'
  ];

  const getCategoryStats = (categoryName) => {
    const categoryTasks = tasks.filter(task => task.category === categoryName);
    const completed = categoryTasks.filter(task => task.completed).length;
    return { total: categoryTasks.length, completed };
  };

  const handleBack = () => {
    navigate('/user/home');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pb-24" style={{ backgroundColor: theme.semantic.background.primary }}>
        <div className="px-4 py-6">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse mr-3"></div>
            <div>
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                <div className="w-24 h-4 bg-gray-200 rounded mb-4"></div>
                <div className="w-full h-48 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: theme.semantic.background.primary }}>
      {/* Header */}
      <div className="px-4 py-6">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="mr-3 p-2 rounded-full"
            style={{ backgroundColor: theme.semantic.background.accent }}
          >
            <Icon name="chevronDown" size="sm" className="rotate-90" style={{ color: theme.semantic.text.primary }} />
          </button>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: theme.semantic.text.primary }}>
              Wedding Checklist
            </h1>
            <p className="text-sm mt-1" style={{ color: theme.semantic.text.secondary }}>
              Track your wedding planning progress
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 text-center" style={{ boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40` }}>
            <p className="text-xs font-medium mb-1" style={{ color: theme.semantic.text.secondary }}>Total Tasks</p>
            <p className="text-lg font-bold" style={{ color: theme.colors.secondary[600] }}>
              {totalTasks}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center" style={{ boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40` }}>
            <p className="text-xs font-medium mb-1" style={{ color: theme.semantic.text.secondary }}>Completed</p>
            <p className="text-lg font-bold" style={{ color: theme.colors.accent[600] }}>
              {completedTasks}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center" style={{ boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40` }}>
            <p className="text-xs font-medium mb-1" style={{ color: theme.semantic.text.secondary }}>Pending</p>
            <p className="text-lg font-bold" style={{ color: theme.colors.primary[600] }}>
              {pendingTasks}
            </p>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="px-4 space-y-6">
        <div className="bg-white rounded-xl p-4" style={{ boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40` }}>
          <h3 className="font-bold text-lg mb-4" style={{ color: theme.semantic.text.primary }}>
            Overall Progress
          </h3>
          <div className="relative mb-4">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${completionPercentage}%`,
                  background: `linear-gradient(135deg, ${theme.colors.secondary[400]} 0%, ${theme.colors.secondary[600]} 100%)`
                }}
              />
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span style={{ color: theme.semantic.text.secondary }}>
                {completionPercentage}% Complete
              </span>
              <span style={{ color: theme.semantic.text.secondary }}>
                {completedTasks} of {totalTasks} tasks
              </span>
            </div>
          </div>
        </div>

        {/* Category Progress */}
        <div className="bg-white rounded-xl p-4" style={{ boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40` }}>
          <h3 className="font-bold text-lg mb-4" style={{ color: theme.semantic.text.primary }}>
            Category Progress
          </h3>
          <div className="space-y-4">
            {categories.map((category, index) => {
              const stats = getCategoryStats(category);
              const percentage = stats.total > 0 ? ((stats.completed / stats.total) * 100).toFixed(1) : 0;
              const color = tasks.find(t => t.category === category)?.color || '#ec4899';
              
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm font-medium" style={{ color: theme.semantic.text.primary }}>
                        {category}
                      </span>
                    </div>
                    <span className="text-sm" style={{ color: theme.semantic.text.secondary }}>
                      {stats.completed}/{stats.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${percentage}%`,
                        backgroundColor: color,
                        animationDelay: `${index * 200}ms`
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-xl p-4" style={{ boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40` }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-lg" style={{ color: theme.semantic.text.primary }}>
              {showAllTasks ? 'All Tasks' : 'Upcoming Tasks'}
            </h3>
            <button
              onClick={() => setShowAllTasks(!showAllTasks)}
              className="text-sm font-medium px-3 py-1 rounded-lg"
              style={{ 
                backgroundColor: theme.colors.secondary[100],
                color: theme.colors.secondary[700]
              }}
            >
              {showAllTasks ? 'Show Less' : 'See All'}
            </button>
          </div>

          {/* Display tasks by category */}
          {categories.map((category) => {
            const categoryTasks = tasks.filter(task => task.category === category);
            const displayTasks = showAllTasks ? categoryTasks : categoryTasks.slice(0, 2);
            
            if (displayTasks.length === 0) return null;

            return (
              <div key={category} className="mb-6 last:mb-0">
                <h4 className="text-sm font-semibold mb-3 flex items-center" style={{ color: theme.semantic.text.primary }}>
                  <div 
                    className="w-2 h-2 rounded-full mr-2"
                    style={{ backgroundColor: categoryTasks[0]?.color }}
                  />
                  {category}
                </h4>
                <div className="space-y-2">
                  {displayTasks.map((task) => (
                    <label 
                      key={task.id}
                      className="flex items-start gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                    >
                      <input 
                        type="checkbox" 
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                        className="w-4 h-4 mt-0.5 accent-pink-600 cursor-pointer" 
                      />
                      <div className="flex-1 min-w-0">
                        <span 
                          className={`text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}
                        >
                          {task.task}
                        </span>
                        <p className="text-xs mt-0.5" style={{ color: theme.semantic.text.secondary }}>
                          {task.dueDate}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-8"></div>
    </div>
  );
};

export default WeddingChecklist;
