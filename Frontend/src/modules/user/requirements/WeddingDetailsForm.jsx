import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import Icon from '../../../components/ui/Icon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const WeddingDetailsForm = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Event categories configuration
  const eventCategories = {
    wedding: {
      label: 'Wedding',
      icon: 'rings',
      fields: {
        brideName: { label: "Bride's Name", type: 'text', required: true },
        groomName: { label: "Groom's Name", type: 'text', required: true },
        weddingDate: { label: 'Wedding Date', type: 'date', required: true },
        venue: { label: 'Venue', type: 'text', required: true },
        budget: { label: 'Total Budget', type: 'number', required: true, prefix: '₹' },
        guestCount: { label: 'Guest Count', type: 'number', required: true },
        weddingTheme: { label: 'Wedding Theme/Style', type: 'text', required: false },
        specialRequirements: { label: 'Notes/Special Requirements', type: 'textarea', required: false }
      }
    },
    birthday: {
      label: 'Birthday',
      icon: 'cake',
      fields: {
        personName: { label: "Birthday Person's Name", type: 'text', required: true },
        age: { label: 'Age', type: 'number', required: true },
        eventDate: { label: 'Birthday Date', type: 'date', required: true },
        venue: { label: 'Venue', type: 'text', required: true },
        budget: { label: 'Total Budget', type: 'number', required: true, prefix: '₹' },
        guestCount: { label: 'Guest Count', type: 'number', required: true },
        theme: { label: 'Party Theme', type: 'text', required: false },
        specialRequirements: { label: 'Special Requirements', type: 'textarea', required: false }
      }
    },
    anniversary: {
      label: 'Anniversary',
      icon: 'heart',
      fields: {
        coupleNames: { label: "Couple's Names", type: 'text', required: true },
        years: { label: 'Years Celebrated', type: 'number', required: true },
        eventDate: { label: 'Anniversary Date', type: 'date', required: true },
        venue: { label: 'Venue', type: 'text', required: true },
        budget: { label: 'Total Budget', type: 'number', required: true, prefix: '₹' },
        guestCount: { label: 'Guest Count', type: 'number', required: true },
        theme: { label: 'Celebration Theme', type: 'text', required: false },
        specialRequirements: { label: 'Special Requirements', type: 'textarea', required: false }
      }
    },
    corporate: {
      label: 'Corporate Event',
      icon: 'briefcase',
      fields: {
        companyName: { label: 'Company Name', type: 'text', required: true },
        eventType: { label: 'Event Type', type: 'text', required: true },
        eventDate: { label: 'Event Date', type: 'date', required: true },
        venue: { label: 'Venue', type: 'text', required: true },
        budget: { label: 'Total Budget', type: 'number', required: true, prefix: '₹' },
        guestCount: { label: 'Expected Attendees', type: 'number', required: true },
        purpose: { label: 'Event Purpose', type: 'text', required: false },
        specialRequirements: { label: 'Special Requirements', type: 'textarea', required: false }
      }
    },
    others: {
      label: 'Others',
      icon: 'sparkles',
      fields: {
        eventName: { label: 'Event Name', type: 'text', required: true },
        organizerName: { label: 'Organizer Name', type: 'text', required: true },
        eventDate: { label: 'Event Date', type: 'date', required: true },
        venue: { label: 'Venue', type: 'text', required: true },
        budget: { label: 'Total Budget', type: 'number', required: true, prefix: '₹' },
        guestCount: { label: 'Expected Guests', type: 'number', required: true },
        eventType: { label: 'Event Type/Category', type: 'text', required: false },
        specialRequirements: { label: 'Special Requirements', type: 'textarea', required: false }
      }
    }
  };

  const [selectedCategory, setSelectedCategory] = useState('wedding');
  const [formData, setFormData] = useState({
    brideName: '',
    groomName: '',
    weddingDate: '',
    venue: '',
    budget: '',
    guestCount: '',
    weddingTheme: '',
    specialRequirements: ''
  });

  const [errors, setErrors] = useState({});

  // Initialize form data when category changes
  const initializeFormData = (category) => {
    const fields = eventCategories[category].fields;
    const initialData = {};
    Object.keys(fields).forEach(fieldKey => {
      initialData[fieldKey] = '';
    });
    setFormData(initialData);
    setErrors({});
  };

  // Handle category change
  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    initializeFormData(newCategory);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const fields = eventCategories[selectedCategory].fields;

    Object.keys(fields).forEach(fieldKey => {
      const field = fields[fieldKey];
      if (field.required && !formData[fieldKey]?.trim()) {
        newErrors[fieldKey] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const eventData = {
        category: selectedCategory,
        categoryLabel: eventCategories[selectedCategory].label,
        details: formData,
        timestamp: new Date().toISOString()
      };

      // Save to localStorage
      localStorage.setItem('eventDetails', JSON.stringify(eventData));

      // Initialize planning categories based on event type
      initializePlanningCategories(selectedCategory, formData);

      // Initialize budget data
      initializeBudgetData(formData);

      // Navigate to planning dashboard
      navigate('/user/planning-dashboard');
    }
  };

  // Initialize planning categories based on event type
  const initializePlanningCategories = (eventType, formData) => {
    const baseCategories = {
      wedding: [
        { name: 'Venue', status: 'Pending with Discussion', totalBudget: '₹1,00,000', advancePaid: null, balanceAmount: null, id: 'venue' },
        { name: 'Catering', status: 'Pending with Discussion', totalBudget: '₹50,000', advancePaid: null, balanceAmount: null, id: 'catering' },
        { name: 'Photography', status: 'Pending with Budget', totalBudget: '₹30,000', advancePaid: null, balanceAmount: null, id: 'photography' },
        { name: 'Decoration', status: 'Pending with Discussion', totalBudget: '₹50,000', advancePaid: null, balanceAmount: null, id: 'decoration' },
        { name: 'Makeup', status: 'Pending with Budget', totalBudget: '₹25,000', advancePaid: null, balanceAmount: null, id: 'makeup' },
        { name: 'Invitations', status: 'Pending with Discussion', totalBudget: '₹15,000', advancePaid: null, balanceAmount: null, id: 'invitations' }
      ],
      birthday: [
        { name: 'Venue', status: 'Pending with Discussion', totalBudget: '₹30,000', advancePaid: null, balanceAmount: null, id: 'venue' },
        { name: 'Catering', status: 'Pending with Discussion', totalBudget: '₹20,000', advancePaid: null, balanceAmount: null, id: 'catering' },
        { name: 'Photography', status: 'Pending with Budget', totalBudget: '₹15,000', advancePaid: null, balanceAmount: null, id: 'photography' },
        { name: 'Decoration', status: 'Pending with Discussion', totalBudget: '₹10,000', advancePaid: null, balanceAmount: null, id: 'decoration' },
        { name: 'Entertainment', status: 'Pending with Budget', totalBudget: '₹15,000', advancePaid: null, balanceAmount: null, id: 'entertainment' },
        { name: 'Cake', status: 'Pending with Discussion', totalBudget: '₹5,000', advancePaid: null, balanceAmount: null, id: 'cake' }
      ],
      anniversary: [
        { name: 'Venue', status: 'Pending with Discussion', totalBudget: '₹25,000', advancePaid: null, balanceAmount: null, id: 'venue' },
        { name: 'Catering', status: 'Pending with Discussion', totalBudget: '₹15,000', advancePaid: null, balanceAmount: null, id: 'catering' },
        { name: 'Photography', status: 'Pending with Budget', totalBudget: '₹10,000', advancePaid: null, balanceAmount: null, id: 'photography' },
        { name: 'Decoration', status: 'Pending with Discussion', totalBudget: '₹8,000', advancePaid: null, balanceAmount: null, id: 'decoration' },
        { name: 'Gifts', status: 'Pending with Budget', totalBudget: '₹12,000', advancePaid: null, balanceAmount: null, id: 'gifts' }
      ],
      corporate: [
        { name: 'Venue', status: 'Pending with Discussion', totalBudget: '₹50,000', advancePaid: null, balanceAmount: null, id: 'venue' },
        { name: 'Catering', status: 'Pending with Discussion', totalBudget: '₹30,000', advancePaid: null, balanceAmount: null, id: 'catering' },
        { name: 'Audio/Visual', status: 'Pending with Budget', totalBudget: '₹20,000', advancePaid: null, balanceAmount: null, id: 'av' },
        { name: 'Speakers', status: 'Pending with Discussion', totalBudget: '₹15,000', advancePaid: null, balanceAmount: null, id: 'speakers' },
        { name: 'Marketing', status: 'Pending with Budget', totalBudget: '₹10,000', advancePaid: null, balanceAmount: null, id: 'marketing' }
      ],
      others: [
        { name: 'Venue', status: 'Pending with Discussion', totalBudget: '₹20,000', advancePaid: null, balanceAmount: null, id: 'venue' },
        { name: 'Catering', status: 'Pending with Discussion', totalBudget: '₹15,000', advancePaid: null, balanceAmount: null, id: 'catering' },
        { name: 'Decoration', status: 'Pending with Budget', totalBudget: '₹10,000', advancePaid: null, balanceAmount: null, id: 'decoration' },
        { name: 'Photography', status: 'Pending with Discussion', totalBudget: '₹8,000', advancePaid: null, balanceAmount: null, id: 'photography' }
      ]
    };

    const categories = baseCategories[eventType] || baseCategories.others;
    localStorage.setItem('planningCategories', JSON.stringify(categories));
  };

  // Initialize budget data based on form data
  const initializeBudgetData = (formData) => {
    const totalBudget = parseInt(formData.budget) || 500000;

    const budgetData = {
      totalBudget,
      spentAmount: 0,
      remainingAmount: totalBudget,
      categories: [
        { name: 'Venue', totalAmount: Math.floor(totalBudget * 0.4), advancePaid: 0, balanceAmount: Math.floor(totalBudget * 0.4), spent: 0, color: '#ec4899' },
        { name: 'Catering', totalAmount: Math.floor(totalBudget * 0.25), advancePaid: 0, balanceAmount: Math.floor(totalBudget * 0.25), spent: 0, color: '#10b981' },
        { name: 'Photography', totalAmount: Math.floor(totalBudget * 0.15), advancePaid: 0, balanceAmount: Math.floor(totalBudget * 0.15), spent: 0, color: '#f59e0b' },
        { name: 'Decoration', totalAmount: Math.floor(totalBudget * 0.1), advancePaid: 0, balanceAmount: Math.floor(totalBudget * 0.1), spent: 0, color: '#8b5cf6' },
        { name: 'Makeup', totalAmount: Math.floor(totalBudget * 0.05), advancePaid: 0, balanceAmount: Math.floor(totalBudget * 0.05), spent: 0, color: '#06b6d4' },
        { name: 'Others', totalAmount: Math.floor(totalBudget * 0.05), advancePaid: 0, balanceAmount: Math.floor(totalBudget * 0.05), spent: 0, color: '#ef4444' }
      ]
    };

    localStorage.setItem('budgetData', JSON.stringify(budgetData));
  };

  const handleSkip = () => {
    navigate('/user/dashboard');
  };

  return (
    <div
      className="min-h-screen px-4 py-8 pb-24"
      style={{ backgroundColor: theme.semantic.background.secondary }}
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center"
            style={{ backgroundColor: theme.colors.primary[100] }}
          >
            <Icon name={eventCategories[selectedCategory].icon} size="2xl" style={{ color: theme.colors.primary[500] }} />
          </div>
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: theme.semantic.text.primary }}
          >
            📝 Event Details
          </h1>
          <p
            className="text-sm mb-6"
            style={{ color: theme.semantic.text.secondary }}
          >
            Select your event type and fill in the details to get personalized recommendations
          </p>

          {/* Event Category Dropdown */}
          <div className="max-w-md mx-auto">
            <label
              className="block text-sm font-semibold mb-2 text-left"
              style={{ color: theme.colors.primary[600] }}
            >
              Select Event Category: *
            </label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="w-full px-4 py-3 rounded-xl border text-sm font-medium transition-colors"
              style={{
                backgroundColor: theme.semantic.input.background,
                borderColor: theme.semantic.border.primary,
                color: theme.semantic.text.primary
              }}
            >
              {Object.keys(eventCategories).map(key => (
                <option key={key} value={key}>
                  {eventCategories[key].label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dynamic Form Fields */}
          {(() => {
            const fields = eventCategories[selectedCategory].fields;
            const fieldKeys = Object.keys(fields);

            // Group fields into pairs for two-column layout
            const fieldPairs = [];
            for (let i = 0; i < fieldKeys.length; i += 2) {
              fieldPairs.push(fieldKeys.slice(i, i + 2));
            }

            return fieldPairs.map((pair, pairIndex) => (
              <div
                key={pairIndex}
                className="p-6 rounded-2xl"
                style={{ backgroundColor: theme.semantic.background.primary }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {pair.map(fieldKey => {
                    const field = fields[fieldKey];
                    const isTextarea = field.type === 'textarea';

                    return (
                      <div key={fieldKey} className={pair.length === 1 ? 'md:col-span-2' : ''}>
                        <label
                          className="block text-sm font-semibold mb-2"
                          style={{ color: theme.colors.primary[600] }}
                        >
                          {field.label} {field.required && '*'}
                        </label>

                        {isTextarea ? (
                          <textarea
                            name={fieldKey}
                            value={formData[fieldKey] || ''}
                            onChange={handleChange}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            rows="4"
                            className={`w-full px-4 py-3 rounded-xl border text-sm resize-none ${errors[fieldKey] ? 'border-red-500' : ''
                              }`}
                            style={{
                              backgroundColor: theme.semantic.input.background,
                              borderColor: errors[fieldKey]
                                ? '#ef4444'
                                : theme.semantic.border.primary,
                              color: theme.semantic.text.primary
                            }}
                          />
                        ) : (
                          <div className={field.prefix ? 'relative' : ''}>
                            {field.prefix && (
                              <span
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-sm"
                                style={{ color: theme.semantic.text.secondary }}
                              >
                                {field.prefix}
                              </span>
                            )}
                            <Input
                              type={field.type}
                              name={fieldKey}
                              value={formData[fieldKey] || ''}
                              onChange={handleChange}
                              placeholder={`Enter ${field.label.toLowerCase()}`}
                              className={`${errors[fieldKey] ? 'border-red-500' : ''} ${field.prefix ? 'pl-8' : ''
                                }`}
                            />
                          </div>
                        )}

                        {errors[fieldKey] && (
                          <p className="text-xs text-red-500 mt-1">{errors[fieldKey]}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ));
          })()}

          {/* Info Tip */}
          <div
            className="p-4 rounded-xl flex items-start gap-3"
            style={{ backgroundColor: theme.colors.secondary[50] }}
          >
            <Icon name="lightbulb" size="md" style={{ color: theme.colors.secondary[500] }} />
            <p
              className="text-xs"
              style={{ color: theme.semantic.text.secondary }}
            >
              💡 Tip: Providing accurate details helps us recommend the best vendors and services for your {eventCategories[selectedCategory].label.toLowerCase()}!
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full py-4 text-base font-bold"
              style={{
                backgroundColor: theme.colors.primary[500],
                color: 'white'
              }}
            >
              Continue to Planning Dashboard →
            </Button>

            <button
              type="button"
              onClick={handleSkip}
              className="w-full py-3 text-sm font-medium rounded-xl transition-colors"
              style={{
                color: theme.semantic.text.secondary,
                backgroundColor: 'transparent'
              }}
            >
              Skip for now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WeddingDetailsForm;
