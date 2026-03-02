import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import Icon from '../../../components/ui/Icon';
import Button from '../../../components/ui/Button';
import { useState, useEffect } from 'react';

const PlanningDashboard = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [eventData, setEventData] = useState(null);
  const [planningCategories, setPlanningCategories] = useState([]);

  // Load event data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('eventDetails');
    if (saved && saved !== 'null' && saved !== 'undefined') {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && Object.keys(parsed).length > 0) {
          setEventData(parsed);
        } else {
          navigate('/user/requirements', { replace: true });
        }
      } catch (e) {
        localStorage.removeItem('eventDetails');
        navigate('/user/requirements', { replace: true });
      }
    } else {
      navigate('/user/requirements', { replace: true });
    }

    const savedPlanningCategories = localStorage.getItem('planningCategories');
    if (savedPlanningCategories) {
      setPlanningCategories(JSON.parse(savedPlanningCategories));
    } else {
      // Default data if nothing in localStorage (for initial load)
      setPlanningCategories([
        {
          name: 'Venue',
          status: 'Confirmed',
          advancePaid: '₹25,000',
          balanceAmount: '₹75,000',
          totalBudget: '₹1,00,000',
          id: 'venue'
        },
        {
          name: 'Catering',
          status: 'Pending with Discussion',
          advancePaid: null,
          balanceAmount: null,
          totalBudget: '₹50,000',
          id: 'catering'
        },
        {
          name: 'Photography',
          status: 'Pending with Budget',
          advancePaid: null,
          balanceAmount: null,
          totalBudget: '₹30,000',
          id: 'photography'
        },
        {
          name: 'Decoration',
          status: 'Confirmed',
          advancePaid: '₹10,000',
          balanceAmount: '₹40,000',
          totalBudget: '₹50,000',
          id: 'decoration'
        },
        {
          name: 'Invitations',
          status: 'Pending with Discussion',
          advancePaid: null,
          balanceAmount: null,
          totalBudget: '₹15,000',
          id: 'invitations'
        },
        {
          name: 'Entertainment',
          status: 'Pending with Budget',
          advancePaid: null,
          balanceAmount: null,
          totalBudget: '₹20,000',
          id: 'entertainment'
        }
      ]);
    }
  }, []);

  // Update category status
  const updateCategoryStatus = (categoryId, newStatus) => {
    const updatedCategories = planningCategories.map(category =>
      category.id === categoryId
        ? { ...category, status: newStatus }
        : category
    );
    setPlanningCategories(updatedCategories);
    localStorage.setItem('planningCategories', JSON.stringify(updatedCategories));
  };

  // Update category financial details
  const updateCategoryFinancials = (categoryId, advancePaid, balanceAmount) => {
    const updatedCategories = planningCategories.map(category =>
      category.id === categoryId
        ? {
          ...category,
          advancePaid,
          balanceAmount,
          status: 'Confirmed' // Auto-update status when financials are added
        }
        : category
    );
    setPlanningCategories(updatedCategories);
    localStorage.setItem('planningCategories', JSON.stringify(updatedCategories));

    // Also update budget data
    updateBudgetData(updatedCategories);
  };

  // Update budget data based on planning categories
  const updateBudgetData = (categories) => {
    const confirmedCategories = categories.filter(cat => cat.status === 'Confirmed');
    const totalSpent = confirmedCategories.reduce((sum, cat) => {
      const advance = parseInt(cat.advancePaid?.replace(/[₹,]/g, '') || 0);
      return sum + advance;
    }, 0);

    const totalBudget = categories.reduce((sum, cat) => {
      const budget = parseInt(cat.totalBudget?.replace(/[₹,]/g, '') || 0);
      return sum + budget;
    }, 0);

    const budgetData = {
      totalBudget,
      spentAmount: totalSpent,
      remainingAmount: totalBudget - totalSpent,
      categories: categories.map(cat => ({
        name: cat.name,
        totalAmount: parseInt(cat.totalBudget?.replace(/[₹,]/g, '') || 0),
        advancePaid: parseInt(cat.advancePaid?.replace(/[₹,]/g, '') || 0),
        balanceAmount: parseInt(cat.balanceAmount?.replace(/[₹,]/g, '') || 0),
        spent: parseInt(cat.advancePaid?.replace(/[₹,]/g, '') || 0),
        color: getCategoryColor(cat.name)
      }))
    };

    localStorage.setItem('budgetData', JSON.stringify(budgetData));
  };

  // Get category color
  const getCategoryColor = (categoryName) => {
    const colors = {
      'Venue': '#ec4899',
      'Catering': '#10b981',
      'Photography': '#f59e0b',
      'Decoration': '#8b5cf6',
      'Invitations': '#06b6d4',
      'Entertainment': '#ef4444',
      'Makeup': '#06b6d4',
      'Others': '#ef4444'
    };
    return colors[categoryName] || '#6b7280';
  };

  // Handle tool navigation with proper state
  const handleToolNavigation = (tool) => {
    // Store current context for navigation
    localStorage.setItem('lastVisitedTool', tool.id);
    navigate(tool.route);
  };

  // Handle vendor navigation
  const handleVendorNavigation = (categoryName) => {
    // Convert category name to URL-friendly format
    const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/user/vendors/${categorySlug}`);
  };

  // Handle planning progress click
  const handlePlanningProgressClick = () => {
    // Navigate to budget planner with context
    navigate('/user/tools/budget', { state: { fromPlanningDashboard: true } });
  };

  // Get dashboard title based on event type
  const getDashboardTitle = () => {
    if (!eventData) return 'Planning Dashboard';

    const eventTitles = {
      wedding: 'Wedding Planning Dashboard',
      birthday: 'Birthday Planning Dashboard',
      anniversary: 'Anniversary Planning Dashboard',
      corporate: 'Corporate Event Planning Dashboard',
      others: 'Event Planning Dashboard'
    };

    return eventTitles[eventData.category] || 'Planning Dashboard';
  };

  // Reordered planning tools as per requirements
  const planningTools = [
    { id: 'venue', title: 'FIND VENUE', description: 'Book perfect venues', icon: 'home', route: '/user/vendors/venues', color: '#10b981' },
    { id: 'photography', title: 'PHOTOGRAPHY & VIDEOGRAPHY', description: 'Capture moments', icon: 'camera', route: '/user/vendors/photographers', color: '#f59e0b' },
    { id: 'guests', title: 'START YOUR GUEST LIST', description: 'Manage RSVPs', icon: 'users', route: '/user/tools/guests', color: '#06b6d4' },
    { id: 'caterers', title: 'CATERERS', description: 'Food services', icon: 'store', route: '/user/vendors/catering', color: '#10b981' },
    { id: 'family', title: 'CREATE A GROUP WITH FAMILY & FRIENDS', description: 'Coordinate with family', icon: 'users', route: '/user/family/groups', color: '#ef4444' },
    { id: 'transport', title: 'TRANSPORTATION', description: 'Travel services', icon: 'globe', route: '/user/vendors/transport', color: '#8b5cf6' },
    { id: 'invitations', title: 'INVITATION CARDS', description: 'Digital Invites', icon: 'envelope', route: '/user/e-invites', color: '#ec4899' },
    { id: 'decorators', title: 'FLOWERS & DECORATORS', description: 'Venue decoration', icon: 'palette', route: '/user/vendors/decorators', color: '#8b5cf6' },
    { id: 'accessories', title: 'BRIDAL & GROOM ACCESSORIES', description: 'Wedding attire', icon: 'store', route: '/user/vendors/accessories', color: '#ec4899' },
    { id: 'health', title: 'HEALTH & BEAUTY', description: 'Makeup & Spa', icon: 'makeup', route: '/user/vendors/makeup', color: '#06b6d4' },
    { id: 'entertainment', title: 'ENTERTAINMENTS', description: 'DJ & Performances', icon: 'party', route: '/user/vendors/entertainment', color: '#ef4444' },
    { id: 'gifts', title: 'RETURN GIFTS', description: 'Guest favors', icon: 'sparkles', route: '/user/vendors/gifts', color: '#f59e0b' },
    { id: 'honeymoon', title: 'HONEYMOON', description: 'Travel planning', icon: 'globe', route: '/user/vendors/honeymoon', color: '#06b6d4' },
    { id: 'mehndi', title: 'MEHANDI ARTIST', description: 'Bridal designs', icon: 'palette', route: '/user/vendors/mehndi', color: '#f59e0b' },
    { id: 'choreographers', title: 'CHOREOGRAPHERS', description: 'Dance training', icon: 'star', route: '/user/vendors/choreography', color: '#8b5cf6' },
    { id: 'cakes', title: 'CAKES', description: 'Desserts & Cakes', icon: 'sparkles', route: '/user/vendors/cakes', color: '#ec4899' },
    { id: 'jewellery', title: 'JEWELLERY', description: 'Wedding jewels', icon: 'rings', route: '/user/vendors/jewellery', color: '#f59e0b' },
    { id: 'led', title: 'LED SCREEN', description: 'Visual displays', icon: 'video', route: '/user/vendors/led', color: '#06b6d4' },
    { id: 'streaming', title: 'LIVE STREAMING', description: 'Remote viewing', icon: 'video', route: '/user/vendors/streaming', color: '#ef4444' },
    { id: 'fraudstars', title: 'REPORTED FRAUDSTARS', description: 'Security alerts', icon: 'warning', route: '/user/vendors/fraudstars', color: '#ef4444' },
    {
      id: 'timeline',
      title: 'Event Timeline',
      description: 'Plan your event schedule',
      icon: 'clock',
      route: '/user/tools/timeline',
      color: '#8b5cf6'
    }
  ];

  const upcomingTasks = [
    { task: 'Book wedding venue', dueDate: '2 weeks left', priority: 'high' },
    { task: 'Send save the dates', dueDate: '1 month left', priority: 'medium' },
    { task: 'Book photographer', dueDate: '3 weeks left', priority: 'high' },
    { task: 'Order wedding invitations', dueDate: '6 weeks left', priority: 'low' }
  ];

  const handleBack = () => {
    navigate('/user/requirements', { state: { editMode: true } });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return '#10b981';
      case 'Pending with Discussion': return '#f59e0b';
      case 'Pending with Budget': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (!eventData) return null;

  return (
    <div className="min-h-screen pb-52" style={{ backgroundColor: theme.semantic.background.primary }}>
      {/* Header Section */}
      <div className="px-4 py-6">
        <div className="flex items-center mb-4">
          <button
            onClick={handleBack}
            className="mr-3 p-2 rounded-full"
            style={{ backgroundColor: theme.semantic.background.accent }}
          >
            <Icon name="chevronDown" size="sm" className="rotate-90" style={{ color: theme.semantic.text.primary }} />
          </button>
          <div>
            <h1
              className="text-2xl font-bold"
              style={{ color: theme.semantic.text.primary }}
            >
              {getDashboardTitle()}
            </h1>
            <p
              className="text-sm mt-1"
              style={{ color: theme.semantic.text.secondary }}
            >
              Your complete event planning toolkit
            </p>
          </div>
        </div>

        {eventData && (
          <div className="space-y-6">
            {/* Planning Tools Grid */}
            <div className="px-4 mb-8">
              <h2
                className="text-xl font-bold mb-4"
                style={{ color: theme.semantic.text.primary }}
              >
                PLANING TOOLS
              </h2>

              <div className="grid grid-cols-3 gap-2">
                {planningTools.map((tool) => (
                  <div
                    key={tool.id}
                    onClick={() => handleToolNavigation(tool)}
                    className="planning-tool-card cursor-pointer"
                  >
                    <div
                      className="p-2 py-3 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 flex flex-col items-center justify-between min-h-[100px]"
                      style={{
                        backgroundColor: theme.semantic.card.background,
                        boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40`,
                        border: `1px solid ${theme.semantic.card.border}`
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                        style={{ backgroundColor: `${tool.color}20` }}
                      >
                        <Icon
                          name={tool.icon}
                          size="sm"
                          style={{ color: tool.color }}
                        />
                      </div>

                      <h3
                        className="font-bold text-[9px] text-center leading-tight line-clamp-3 w-full"
                        style={{ color: theme.semantic.text.primary }}
                      >
                        {tool.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Planning Progress Section */}
            <div
              className="p-4 rounded-xl mb-6 cursor-pointer"
              onClick={handlePlanningProgressClick}
              style={{
                background: 'linear-gradient(135deg, #fdf2f8 0%, #fffbeb 100%)',
                border: `1px solid ${theme.semantic.border.accent}`
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="font-bold text-lg"
                  style={{ color: theme.semantic.text.primary }}
                >
                  Planning Progress
                </h3>
                <Icon
                  name="chevronDown"
                  size="sm"
                  className="-rotate-90"
                  style={{ color: theme.semantic.text.secondary }}
                />
              </div>

              {/* Planning Categories List */}
              <div className="space-y-3">
                {planningCategories.map((category, index) => (
                  <div
                    key={category.id}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-white hover:bg-opacity-50 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Cycle through statuses on click
                      const statuses = ['Pending with Discussion', 'Pending with Budget', 'Confirmed'];
                      const currentIndex = statuses.indexOf(category.status);
                      const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                      updateCategoryStatus(category.id, nextStatus);
                    }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className="font-medium text-sm"
                          style={{ color: theme.semantic.text.primary }}
                        >
                          {category.name}
                        </span>
                        <span
                          className="text-xs font-medium px-2 py-1 rounded-full cursor-pointer"
                          style={{
                            backgroundColor: `${getStatusColor(category.status)}20`,
                            color: getStatusColor(category.status)
                          }}
                        >
                          {category.status}
                        </span>
                      </div>

                      {category.status === 'Confirmed' && (
                        <div className="flex items-center gap-4 text-xs mb-2">
                          <span style={{ color: theme.semantic.text.secondary }}>
                            Advance: <span className="font-medium">{category.advancePaid}</span>
                          </span>
                          <span style={{ color: theme.semantic.text.secondary }}>
                            Balance: <span className="font-medium">{category.balanceAmount}</span>
                          </span>
                          <span style={{ color: theme.semantic.text.secondary }}>
                            Total: <span className="font-medium">{category.totalBudget}</span>
                          </span>
                        </div>
                      )}

                      {category.status !== 'Confirmed' && (
                        <div className="text-xs mb-2" style={{ color: theme.semantic.text.secondary }}>
                          Budget: {category.totalBudget}
                        </div>
                      )}

                      {/* Vendor Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleVendorNavigation(category.name);
                        }}
                        className="w-full py-1 px-3 rounded text-xs font-medium transition-all duration-200"
                        style={{
                          backgroundColor: `${getStatusColor(category.status)}20`,
                          color: getStatusColor(category.status),
                          border: `1px solid ${getStatusColor(category.status)}40`
                        }}
                      >
                        Find {category.name} Vendors →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-center mt-3" style={{ color: theme.semantic.text.tertiary }}>
                💡 Click on categories to change status
              </p>
            </div>

            {/* Upcoming Tasks */}
            <div className="px-4 mb-8">
              <h2
                className="text-xl font-bold mb-4"
                style={{ color: theme.semantic.text.primary }}
              >
                Upcoming Tasks
              </h2>

              <div className="space-y-3">
                {upcomingTasks.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl flex items-center justify-between"
                    style={{
                      backgroundColor: theme.semantic.card.background,
                      border: `1px solid ${theme.semantic.card.border}`
                    }}
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${item.priority === 'high' ? 'task-priority-high' :
                          item.priority === 'medium' ? 'task-priority-medium' : 'task-priority-low'
                          }`}
                      />
                      <div>
                        <p
                          className="font-medium text-sm"
                          style={{ color: theme.semantic.text.primary }}
                        >
                          {item.task}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: theme.semantic.text.secondary }}
                        >
                          {item.dueDate}
                        </p>
                      </div>
                    </div>

                    <Icon
                      name="chevronDown"
                      size="sm"
                      className="-rotate-90"
                      style={{ color: theme.semantic.text.tertiary }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => navigate('/user/vendors')}
                  className="py-3 text-sm font-bold"
                  style={{
                    backgroundColor: theme.semantic.button.outline.background,
                    color: theme.colors.primary[500],
                    border: `2px solid ${theme.colors.primary[200]}`
                  }}
                >
                  Browse Vendors
                </Button>

                <Button
                  onClick={() => navigate('/user/inspirations')}
                  className="py-3 text-sm font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
                    color: 'white'
                  }}
                >
                  Get Inspired
                </Button>
              </div>
            </div>

            {/* Bottom spacing */}
            <div className="h-8"></div>
          </div>
        )}
      </div>
      {/* Sticky Check List Button */}
      <div
        className="fixed bottom-20 left-0 right-0 p-4 z-50"
        style={{
          backgroundColor: `${theme.semantic.background.primary}CC`,
          backdropFilter: 'blur(8px)',
          borderTop: `1px solid ${theme.semantic.border.light}`
        }}
      >
        <button
          onClick={() => navigate('/user/tools/checklist')}
          className="mx-auto py-2.5 px-8 rounded-full font-bold flex items-center justify-center space-x-2 shadow-lg transition-transform active:scale-95"
          style={{
            backgroundColor: theme.colors.primary[500],
            color: 'white',
            boxShadow: `0 4px 12px -2px ${theme.colors.primary[500]}40`
          }}
        >
          <Icon name="checkList" size="sm" />
          <span className="text-sm">CHECK LIST</span>
        </button>
      </div>
    </div>
  );
};

export default PlanningDashboard;